import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToAdminDashboard from './BackToAdminDashboard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../api/axios';
import './AdminReports.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminReports = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await api.get('/User/getprogress');
        setReportsData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  if (loading) {
    return (
      <div className="admin-reports-wrapper">
        <div className="admin-reports-container">
          <BackToAdminDashboard />
          <h2>Reports & Analytics</h2>
          <div className="loading-message">Loading data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-reports-wrapper">
        <div className="admin-reports-container">
          <BackToAdminDashboard />
          <h2>Reports & Analytics</h2>
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

  // Transform API data for charts
  const userGrowthData = Object.entries(reportsData.progrssoversixmonths).map(([month, users]) => ({
    name: month,
    users: users
  }));

  const userStatusData = [
    { name: 'New Users', value: reportsData.newusers },
    { name: 'Active Users', value: reportsData.activeusers },
    { name: 'Stagnant Users', value: reportsData.stagnantUsers }
  ];

  return (
    <div className="admin-reports-wrapper">
      <div className="admin-reports-container">
        <BackToAdminDashboard />
        <h2>Reports & Analytics</h2>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total New Users</h3>
            <div className="stat-value">{reportsData.newusers}</div>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="stat-value">{reportsData.activeusers}</div>
          </div>
          <div className="stat-card">
            <h3>Stagnant Users</h3>
            <div className="stat-value">{reportsData.stagnantUsers}</div>
          </div>
        </div>

        <div className="chart-container">
          <h3>User Growth Over Months</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#007bff" name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>User Status Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={userStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {userStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;