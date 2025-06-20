import React from 'react';
import './DashboardContent.css';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const DashboardContent = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Mavericks Coding Platform</h2>
        <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </div>
    </div>
  );
};

export default DashboardContent;
