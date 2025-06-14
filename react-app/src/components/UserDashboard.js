import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { FaRocket, FaUsers, FaTrophy, FaHome, FaClipboardList, FaCogs } from 'react-icons/fa';

const UserDashboard = () => {
  const [timeLeft, setTimeLeft] = useState(5000); // Example: 5000 seconds left

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-title">Mavericks Coding Platform</div>
        <ul className="sidebar-menu">
          <li><FaHome /> Home</li>
          <li><FaClipboardList /> Challenges</li>
          <li><FaClipboardList /> My Submissions</li>
          <li><FaUsers /> Teams</li>
          <li><FaTrophy /> Leaderboard</li>
          <li><FaCogs /> Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h2 className="dashboard-title">Featured Challenge</h2>
        <div className="dashboard-widgets">
          <div className="dashboard-widget challenge-card">
            <div className="challenge-timer">{formatTime(timeLeft)}</div>
            <h3>Challenge Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="primary-btn">Start Challenge</button>
          </div>

          <div className="dashboard-widget activity-card">
            <h4>Recent Activity</h4>
            <ul className="activity-list">
              <li>✅ User1 submitted a solution (2h ago)</li>
              <li>👥 User2 joined your team (3h ago)</li>
              <li>⭐ User3 started following you (5h ago)</li>
            </ul>
          </div>

          <div className="dashboard-widget team-card">
            <h4>Team Participation</h4>
            <p>Start collaborating with your team members now!</p>
            <button className="secondary-btn">Join Team</button>
          </div>

          <div className="dashboard-widget leaderboard-card">
            <h4>Leaderboard</h4>
            <p>See where you stand among others!</p>
            <button className="secondary-btn">View Leaderboard</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
