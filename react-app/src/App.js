import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
 
// User Components
import LoginForm from './components/LoginForm';
import DashboardContent from './components/DashboardContent';
import Sidebar from './components/Sidebar';
import HackathonPage from './components/HackathonPage';
import Teams from './components/Teams';
import Settings from './components/Settings';
import ChallengeHistory from './components/ChallengeHistory';
import CodingPage from './components/CodingPage';
 
// Admin Components
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminHackathons from './components/AdminHackathons';
import AdminReports from './components/AdminReports';
import AdminCreateHackathon from './components/AdminCreateHackathon';
import AdminSideBar from './components/AdminSideBar';
 
import './App.css';
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
 
  return (
    <div className="App">
        {isLoggedIn && userRole === 'user' ? (
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '250px', width: '100%' }}>
              <Routes>
                <Route path="/dashboard" element={<DashboardContent setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                <Route path="/hackathons" element={<HackathonPage />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/history" element={<ChallengeHistory />} />
                <Route path="/coding/:challengeId" element={<CodingPage />} />
 
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : isLoggedIn && userRole === 'admin' ? (
          <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ marginLeft: '250px', width: '100%' }}>
              <Routes>
                <Route path="/admin-dashboard" element={<AdminDashboard setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                <Route path="/admin/users-progress" element={<AdminUsers />} />
                <Route path="/admin/manage-hackathons" element={<AdminHackathons />} />
                <Route path="/admin/reports-analytics" element={<AdminReports />} />
                <Route path="/admin/AdminCreateHackathon" element={<AdminCreateHackathon />} />
                <Route path="*" element={<Navigate to="/admin-dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </div>
  );
}
 
export default App;