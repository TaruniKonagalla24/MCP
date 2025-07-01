import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import html2canvas from 'html2canvas';
import api from '../api/axios';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminReports.css';
 
const COLORS = ['#3b82f6', '#10b981','#f87171' ];
const RANGE_OPTIONS = ['3M', '6M', '12M'];
 
const AdminReports = ({ setIsLoggedIn, setUserRole }) => {
  const [reportsData, setReportsData] = useState(null);
  const [error, setError] = useState(null);
  const [range, setRange] = useState('6M');
 
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await api.get('/User/getprogress');
        setReportsData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReportsData();
  }, []);
 
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };
 
  const downloadChartAsPNG = (ref, filename) => {
    if (!ref.current) return;
    setTimeout(() => {
      html2canvas(ref.current, {
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        link.click();
      });
    }, 300);
  };
 
  const monthCount = range === '3M' ? 3 : range === '6M' ? 6 : 12;
  const userGrowthData = reportsData?.progrssoversixmonths
    ? Object.entries(reportsData.progrssoversixmonths)
        .slice(-monthCount)
        .map(([month, users]) => ({ name: month, users }))
    : [];
 
  const userStatusData = reportsData
    ? [
        { name: 'New Users', value: reportsData.newusers },
        { name: 'Active Users', value: reportsData.activeusers },
        { name: 'Stagnant Users', value: reportsData.stagnantUsers }
      ]
    : [];
 
  const totalUsers = reportsData
    ? reportsData.newusers + reportsData.activeusers + reportsData.stagnantUsers
    : 0;
 
  return (
    <div className="admin-reports-wrapper">
      <div className="admin-reports-container">
        <div className="dashboard-header">
          <h2>📊 Reports & Analytics</h2>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
 
        {error && <div className="error-message">Error: {error}</div>}
 
        <div className="controls-bar">
          <div className="range-selector">
            {RANGE_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`range-btn ${range === opt ? 'active' : ''}`}
                onClick={() => setRange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
 
        <div className="total-users">
          👥 <strong>Total Users:</strong> {totalUsers}
        </div>
 
        <div className="stats-container">
          <div className="stat-card red">
            <div className="stat-icon">🧑‍🎓</div>
            <h3>New Users</h3>
            <h1>{reportsData?.newusers ?? '--'}</h1>
          </div>
          <div className="stat-card green">
            <div className="stat-icon">🟢</div>
            <h3>Active Users</h3>
            <h1>{reportsData?.activeusers ?? '--'}</h1>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">⏸️</div>
            <h3>Stagnant Users</h3>
            <h1>{reportsData?.stagnantUsers ?? '--'}</h1>
          </div>
        </div>
 
        <div className="chart-header">
          <h3>User Growth - Last {range}</h3>
          <button className="export-btn" onClick={() => downloadChartAsPNG(barChartRef, 'user-growth.png')}>
            📥 Download Bar Chart
          </button>
        </div>
        <div className="chart-container" ref={barChartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
 
        <div className="chart-header">
          <h3>User Status Distribution</h3>
          <button className="export-btn" onClick={() => downloadChartAsPNG(pieChartRef, 'user-status.png')}>
            📥 Download Pie Chart
          </button>
        </div>
        <div className="chart-container" ref={pieChartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={userStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {userStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
 
export default AdminReports;