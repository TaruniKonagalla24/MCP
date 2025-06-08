// components/BackToAdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin')}
      style={{
        margin: '20px',
        padding: '10px 18px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
      onMouseLeave={e => (e.target.style.backgroundColor = '#3498db')}
    >
      ← Back to Dashboard
    </button>
  );
};

export default BackToAdminDashboard;
