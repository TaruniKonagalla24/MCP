import React, { useState, useEffect } from 'react';
import './DashboardContent.css';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaTrophy, FaClock, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import api from '../api/axios';

function CountdownTimer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  
  useEffect(() => {
    // Parse the startTime string into a Date object
    const parseStartTime = () => {
      try {
        // If startTime is already a Date object or timestamp, use it directly
        if (startTime instanceof Date || typeof startTime === 'number') {
          return new Date(startTime);
        }
        
        // Try parsing ISO string (common API response format)
        const parsedDate = new Date(startTime);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
        
        // Try parsing other formats if needed
        console.warn('Falling back to alternative date parsing');
        return new Date(startTime.replace(' ', 'T'));
      } catch (e) {
        console.error('Error parsing date:', e);
        return null;
      }
    };

    const updateTimer = () => {
      const start = parseStartTime();
      if (!start) {
        setTimeLeft('Invalid date');
        return;
      }

      const now = new Date();
      const diff = Math.max(0, start - now);
      
      // If the event has already started
      if (diff <= 0) {
        setTimeLeft('Started!');
        return;
      }
      
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Initial update
    updateTimer();
    
    // Set up interval for continuous updates
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);
  
  return <span className="countdown">{timeLeft}</span>;
}

const DashboardContent = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const loadUserAndData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) throw new Error('User not authenticated');

        const parsedUser = JSON.parse(userData);
        if (!parsedUser?.id) throw new Error('Invalid user data');

        setUser(parsedUser);

        // Load dashboard data
        const dashboardResponse = await api.post('/User/DashboardDTO', {
          userid: parsedUser.id
        });

        if (!dashboardResponse.data) throw new Error('No dashboard data received');
        setDashboardData(dashboardResponse.data);

        // Load user badges from hackathons
        const badgesResponse = await api.post('/Hackathon/Getmyhackathons', 
          parsedUser.id.toString(), // Send just the user ID as string
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        // Filter hackathons where badge is not null
        const earnedBadges = badgesResponse.data
          .filter(hackathon => hackathon.badge)
          .map(hackathon => hackathon.badge);
        
        setUserBadges(earnedBadges);
        
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.response?.data?.message || err.message);
        
        if (err.message.includes('not authenticated') || err.message.includes('Invalid user')) {
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUserRole('');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserAndData();
  }, [navigate, setIsLoggedIn, setUserRole]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container error-container">
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button onClick={handleLogout}>Return to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome {user?.username} to Mavericks Coding Platform</h2>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3><FaClock className="LeaderBoard" /> Next Challenge</h3>
          {dashboardData?.nextchallenge ? (
            <>
              <p>{dashboardData.nextchallenge.problem}</p>
              <p>Difficulty: {dashboardData.nextchallenge.difficulty}</p>
              <p>Starts in: <CountdownTimer startTime={dashboardData.nextchallenge.startTime} /></p>
              <p>Badge: {dashboardData.nextchallenge.badges}</p>
            </>
          ) : (
            <p>No upcoming challenges</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3><FaFire className="icon" /> Your Stats</h3>
          {user && (
            <>
              <p>Points: <strong>{user.points || 0}</strong></p>
              <p>Current Streak: <strong>{user.streak || 0} days</strong></p>
              <p>Skills: {user.skills || 'Not specified'}</p>
            </>
          )}
        </div>

        <div className="dashboard-card">
          <h3><FaTasks className="LeaderBoard" /> Recent Activity</h3>
          <ul>
            {dashboardData?.recentActivities?.length > 0 ? (
              dashboardData.recentActivities.map((activity, index) => (
                <li key={index}>{activity.username}: {activity.summary}</li>
              ))
            ) : (
              <li>No recent activity</li>
            )}
          </ul>
        </div>

        <div className="dashboard-card">
          <h3><FaTrophy className="icon" /> Leaderboard</h3>
          <ul>
            {dashboardData?.leaderboardDTOs?.length > 0 ? (
              dashboardData.leaderboardDTOs.map((entry, index) => (
                <li key={index}>
                  {entry.username} – <strong>{entry.points} pts</strong>
                  {user?.username === entry.username && ' (You)'}
                </li>
              ))
            ) : (
              <li>No leaderboard data available</li>
            )}
          </ul>
        </div>

        <div className="dashboard-card full-width">
          <h3>🏅 Your Badges</h3>
          <div className="badge-list">
            {userBadges.length > 0 ? (
              userBadges.map((badge, index) => (
                <span key={index}>🏅 {badge}</span>
              ))
            ) : (
              <span>No badges earned yet. Keep participating!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;