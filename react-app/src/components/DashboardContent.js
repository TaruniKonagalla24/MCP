import React, { useState, useEffect } from 'react';
import './DashboardContent.css';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaTrophy, FaClock, FaTasks, FaSignOutAlt } from 'react-icons/fa';
const mockData = {
 nextChallenge: {
   name: 'Frontend Wizardry',
   startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
 },
 leaderboard: [
   { name: 'Tarun K', points: 980 },
   { name: 'Divya S', points: 910 },
   { name: 'Ajay M', points: 880 },
 ],
 recentActivities: [
   'Tarun completed "API Mastery"',
   'Divya joined "Frontend Wizardry"',
   'Ajay earned a badge',
 ],
 dailyReminder: {
   quote: 'Keep pushing your limits!',
   streak: 5,
 },
 badges: ['🔥 Consistent', '🏅 Top Performer', '💡 Innovator'],
};

function CountdownTimer({ startTime }) {
 const [timeLeft, setTimeLeft] = useState('');
 useEffect(() => {
   const interval = setInterval(() => {
     const diff = Math.max(0, new Date(startTime) - new Date());
     const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
     const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
     const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
     setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
   }, 1000);
   return () => clearInterval(interval);
 }, [startTime]);
 return <span className="countdown">{timeLeft}</span>;
}
const DashboardContent =  ({ setIsLoggedIn, setUserRole}) => {
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
<div className="dashboard-grid">
<div className="dashboard-card">
<h3><FaClock className="LeaderBoard" /> Next Challenge</h3>
<p>{mockData.nextChallenge.name}</p>
<p>Starts in: <CountdownTimer startTime={mockData.nextChallenge.startTime} /></p>
</div>
<div className="dashboard-card">
<h3><FaFire className="icon" /> Daily Reminder</h3>
<p className="quote">"{mockData.dailyReminder.quote}"</p>
<p>Current Streak: <strong>{mockData.dailyReminder.streak} days</strong></p>
</div>
<div className="dashboard-card">
<h3><FaTasks className="LeaderBoard" /> Recent Activity</h3>
<ul>
           {mockData.recentActivities.map((activity, index) => (
<li key={index}>{activity}</li>
           ))}
</ul>
</div>
<div className="dashboard-card">
<h3><FaTrophy className="icon" /> Leaderboard</h3>
<ul>
           {mockData.leaderboard.map((entry, index) => (
<li key={index}>{entry.name} – <strong>{entry.points} pts</strong></li>
           ))}
</ul>
</div>
       {/* ✅ Updated Badges Section */}
<div className="dashboard-card full-width">
<h3>🏅 Badges</h3>

  <div className="badge-list">   
  {mockData.badges.map((badge,index) =>(
    <span key={index}>{badge}</span>
  ))}
  </div>    

</div>
</div>
</div>
 );
};
export default DashboardContent;