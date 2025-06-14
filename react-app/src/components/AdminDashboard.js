import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaTasks, FaChartBar, FaClipboardCheck } from 'react-icons/fa';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
const cards = [
  {
    title: 'Users & Progress',
    desc: 'View all users and their progress details',
    icon: <FaUsers />,
    link: '/admin/users',
  },
  {
    title: 'Manage Hackathons',
    desc: 'Create, edit, and delete hackathons',
    icon: <FaTasks />,
    link: '/admin/hackathons',
  },
  {
    title: 'Reports & Analytics',
    desc: 'View detailed reports and analytics',
    icon: <FaChartBar />,
    link: '/admin/reports',
  },
  {
    title: 'Admin Review',
    desc: 'Review admin-specific tasks',
    icon: <FaClipboardCheck />,
    link: '/admin/review',
  },
];

const AdminDashboard = ({ setIsLoggedIn, setUserRole }) => {
    const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };
  return (
    <div className="admin-dashboard">
         <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '8px 15px',
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Logout
      </button>
      <h1>Admin Dashboard</h1>
      <div className="admin-cards-container">
        {cards.map(({ title, desc, icon, link }) => (
          <Link to={link} className="admin-card" key={title}>
            <div className="icon-wrapper">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
