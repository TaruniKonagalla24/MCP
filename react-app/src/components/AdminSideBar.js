import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Layers, BarChart2, CheckSquare } from 'lucide-react';
import './AdminSideBar.css';

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><NavLink to="/admin-dashboard"><Home /> Dashboard</NavLink></li>
        <li><NavLink to="/admin/users-progress"><Users /> Users Progress</NavLink></li>
        <li><NavLink to="/admin/manage-hackathons"><Layers /> Manage Hackathons</NavLink></li>
        <li><NavLink to="/admin/reports-analytics"><BarChart2 /> Reports & Analytics</NavLink></li>
        <li><NavLink to="/admin/AdminCreateHackathon"><CheckSquare /> Review</NavLink></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
