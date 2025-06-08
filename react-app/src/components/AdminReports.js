import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackToAdminDashboard from './BackToAdminDashboard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './AdminReports.css';

const usersData = [
  { name: 'Jan', users: 40 },
  { name: 'Feb', users: 30 },
  { name: 'Mar', users: 20 },
  { name: 'Apr', users: 27 },
  { name: 'May', users: 18 },
  { name: 'Jun', users: 23 },
];

const challengeData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'In Progress', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminReports = () => {
  return (
    <div className="admin-reports-container">
        <BackToAdminDashboard />
      <h2>Reports & Analytics</h2>

      <div className="chart-container">
        <h3>User Growth Over Months</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Challenge Completion Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={challengeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {challengeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminReports;
