import React, { useState, useEffect } from 'react';
import './DashboardContent.css';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaTrophy, FaClock, FaTasks, FaSignOutAlt, FaLightbulb, FaUsers, FaFilePdf } from 'react-icons/fa';
import api from '../api/axios';

function CountdownTimer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState('Loading...');

  useEffect(() => {
    const parseStartTime = () => {
      try {
        if (startTime instanceof Date || typeof startTime === 'number') {
          return new Date(startTime);
        }
        const parsedDate = new Date(startTime);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
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

      if (diff <= 0) {
        setTimeLeft('Started!');
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return <span className="countdown">{timeLeft}</span>;
}

const formatSkills = (skills) => {
  if (!skills) return null;
  
  if (Array.isArray(skills)) {
    return skills.join(', ');
  }
  
  if (typeof skills === 'string') {
    skills = skills.replace(/[\[\]"]/g, '');
    return skills.replace(',',', ')
  }
  
  return skills;
};

const DashboardContent = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userBadges, setUserBadges] = useState([]);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const loadUserAndData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) throw new Error('User not authenticated');
        console.log('userData:', userData);

        const parsedUser = JSON.parse(userData);
        if (!parsedUser?.id) throw new Error('Invalid user data');
        console.log('parsed:', parsedUser);
  
        setUser(parsedUser);
        console.log('parsed:', parsedUser);

        const dashboardResponse = await api.post('/User/DashboardDTO', {
          userid: parsedUser.id
        });

        if (!dashboardResponse.data) throw new Error('No dashboard data received');
        setDashboardData(dashboardResponse.data);

        const badgesResponse = await api.post('/Hackathon/Getmyhackathons',
          parsedUser.id.toString(),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const earnedBadges = badgesResponse.data
          .filter(h => h.badge)
          .map(h => h.badge);

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

const generateAIReport = async () => {
  if (!user?.id) {
    alert('User information not available. Please try logging in again.');
    return;
  }
  
  setGeneratingReport(true);
  try {
    // Make the API request to get the report text
    const response = await api.post(
      `/User/generatereport?userid=${user.id}`,
      null,
      {
        headers: {
          'Accept': 'text/plain'
        }
      }
    );

    // Check if we got valid text content
    if (!response.data || typeof response.data !== 'string') {
      throw new Error('Invalid report content received');
    }

    // Create a PDF from the text
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Split the text into lines that fit the PDF page
    const lines = doc.splitTextToSize(response.data, 180);
    
    // Add the content to the PDF
    doc.text(lines, 10, 10);
    
    // Save the PDF
    doc.save(`AI_Skill_Report_${user.username}_${new Date().toISOString().split('T')[0]}.pdf`);

  } catch (err) {
    console.error('Error generating report:', err);
    let errorMessage = 'Failed to generate report. ';
    
    if (err.response) {
      if (err.response.status === 404) {
        errorMessage += 'Report generation service not found.';
      } else if (err.response.status >= 500) {
        errorMessage += 'Server error occurred.';
      } else {
        errorMessage += err.response.data || 'Unknown error occurred.';
      }
    } else {
      errorMessage += err.message || 'Please try again later.';
    }
    
    alert(errorMessage);
  } finally {
    setGeneratingReport(false);
  }
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
        <div className="header-buttons">
          <button 
         
            onClick={generateAIReport}
            disabled={generatingReport}
          >
            {generatingReport ? (
              <span>
                <span ></span> Generating...
              </span>
            ) : (
              <>
                <FaFilePdf /> Generate AI Report
              </>
            )}
          </button>
          <button  onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Row 1 - Full width */}
        <div className="dashboard-card highlight-card">
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

        {/* Row 2 - Side by side */}
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
              <li>No leaderboard data yet</li>
            )}
          </ul>
        </div>

        <div className="dashboard-card">
          <h3><FaUsers className="icon" /> Team Challenges</h3>
          <ul>
            {dashboardData?.teamChallenges?.length > 0 ? (
              dashboardData.teamChallenges.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.title || entry.description}</strong> – {entry.level} [{entry.type}]
                </li>
              ))
            ) : (
              <li>No Team challenges available</li>
            )}
          </ul>
        </div>

        {/* Row 3 - Side by side */}
        <div className="dashboard-card">
          <h3><FaFire className="icon" /> Your Stats</h3>
          {user && (
            <>
              <p>Points: <strong>{user.points || 0}</strong></p>
              <p>Current Streak: <strong>{user.streak || 0} days</strong></p>
              <p>Skills from Resume: {formatSkills(user.skills) || 'Not specified'}</p>
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

        {/* Row 4 - Side by side (Recommended + Badges) */}
        <div className="dashboard-card">
          <h3><FaLightbulb className="icon" /> Recommended Challenges</h3>
          <ul>
            {dashboardData?.recommendedChallenges?.length > 0 ? (
              dashboardData.recommendedChallenges.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.title || entry.description}</strong> – {entry.level} [{entry.type}]
                </li>
              ))
            ) : (
              <li>No recommended challenges</li>
            )}
          </ul>
        </div>

       <div className="dashboard-card" style={{ position: 'relative', padding: '20px' }}>
  <h3 style={{ marginBottom: '15px' }}>🏅 Your Badges</h3>

  <div
    className="badge-list"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'flex-start'
    }}
  >
    {userBadges.length > 0 ? (
      userBadges.map((badge, index) => {
        const icons = ['🚀', '💡', '🔥', '⭐', '🏆', '⚡'];
        const randomIcon = icons[index % icons.length]; // loop over icons

        return (
          <span
            key={index}
            style={{
              background: '#f1f5f9',
              color: '#1e293b',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            <span>{randomIcon}</span>
            {badge}
          </span>
        );
      })
    ) : (
      <span style={{ fontSize: '14px', color: '#6b7280' }}>No badges earned yet</span>
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default DashboardContent;