import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaSignOutAlt, FaUsers, FaTrophy, FaTasks, FaHistory, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = ({ setIsLoggedIn, setUserRole }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/Hackathon/admindashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard-content">
        <div className="loading-spinner">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-content">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-content">
      <div className="dashboard-header">
        <h2 style={{ fontWeight: 'bold' }}>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="dashboard-widgets">
        <div className="dashboard-widget">
          <div className="icon-wrapper">
            <FaUsers />
          </div>
          <h3>New Registrations</h3>
          <p className="widget-value">{dashboardData.totalRegistrationsToday}</p>
          <p className="widget-label">Today</p>
        </div>

        <div className="dashboard-widget">
          <div className="icon-wrapper">
            <FaTasks />
          </div>
          <h3>Open Challenges</h3>
          <p className="widget-value">{dashboardData.openchallenge.length}</p>
          <p className="widget-label">Active</p>
        </div>

        <div className="dashboard-widget">
          <div className="icon-wrapper">
            <FaHistory />
          </div>
          <h3>Completed Challenges</h3>
          <p className="widget-value">{dashboardData.completedchallenges.length}</p>
          <p className="widget-label">Total</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Recent Activities</h3>
          <div className="activity-list">
            {dashboardData.recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-user">{activity.username}</div>
                <div className="activity-summary">{activity.summary}</div>
                <div className="activity-time">{formatDate(activity.created)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Current Challenges</h3>
          <div className="challenge-list">
            {dashboardData.openchallenge.map(challenge => (
              <div key={challenge.id} className="challenge-item">
                <div className="challenge-header">
                  <span className="challenge-name">{challenge.problem}</span>
                  <span className={`challenge-difficulty ${challenge.difficulty.toLowerCase()}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="challenge-details">
                  <span>Skill: {challenge.skill}</span>
                  <span>Badge: {challenge.badges}</span>
                </div>
                <div className="challenge-time">
                  Ends: {formatDate(challenge.endTime)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Completed Challenges</h3>
          <div className="challenge-list">
            {dashboardData.completedchallenges.map(challenge => (
              <div key={challenge.id} className="challenge-item completed">
                <div className="challenge-header">
                  <span className="challenge-name">{challenge.problem}</span>
                  <span className={`challenge-difficulty ${challenge.difficulty.toLowerCase()}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="challenge-details">
                  <span>Skill: {challenge.skill}</span>
                  <span>Badge: {challenge.badges}</span>
                </div>
                <div className="challenge-time">
                  Completed: {formatDate(challenge.endTime)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;