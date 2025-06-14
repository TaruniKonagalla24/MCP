import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import DashboardContent from './components/DashboardContent';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';
import HackathonPage from './components/HackathonPage';
import Teams from './components/Teams';
import Settings from './components/Settings';
import ChallengeHistory from './components/ChallengeHistory';
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
<Route path="*" element={<Navigate to="/dashboard" />} />
</Routes>
</div>
</div>
       ) : isLoggedIn && userRole === 'admin' ? (
<Routes>
<Route path="/admin-dashboard" element={<AdminDashboard setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
<Route path="*" element={<Navigate to="/admin-dashboard" />} />
</Routes>
       ) : (
<Routes>
<Route
             path="/"
             element={
<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
             }
           />
<Route path="*" element={<Navigate to="/" />} />
</Routes>
       )}
</div>

 );
}
export default App;