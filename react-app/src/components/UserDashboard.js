import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaCheckCircle, FaTrophy, FaRocket } from 'react-icons/fa';
import './UserDashboard.css';
const UserDashboard = ({ setLoggedInUser })=> {
 const [animatedProgress, setAnimatedProgress] = useState(0);
 const navigate = useNavigate();
 const exercisesCompleted = 12;
 const totalExercises = 20;
 const targetProgress = Math.round((exercisesCompleted / totalExercises) * 100);
 const handleLogout = () => {
  setLoggedInUser(null);
  navigate('/');
};
 const leaderboard = [
   { name: 'Alice', score: 98 },
   { name: 'Bob', score: 92 },
   { name: 'You', score: 89 },
   { name: 'David', score: 85 },
   { name: 'Eve', score: 80 },
 ];
 useEffect(() => {
   const timeout = setTimeout(() => {
     setAnimatedProgress(targetProgress);
   }, 300);
   return () => clearTimeout(timeout);
 }, [targetProgress]);
 const handleHackathonClick = () => {
   navigate('/hackathons');
 };
 return (
<div className="dashboard-container"><button
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

<h1>Welcome to Mavericks, User!</h1>
<div className="dashboard-cards">
<div className="card progress-card">
<h2><FaChartPie className="card-icon" /> Your Progress</h2>
<div className="progress-ring">
<svg width="100" height="100">
<circle className="bg" cx="50" cy="50" r="45" strokeWidth="10" />
<circle
               className="progress"
               cx="50"
               cy="50"
               r="45"
               strokeWidth="10"
               strokeDasharray="282.6"
               strokeDashoffset={282.6 - (282.6 * animatedProgress) / 100}
             />
</svg>
<div className="progress-text">{animatedProgress}%</div>
</div>
</div>
<div className="card exercises-card">
<h2><FaCheckCircle className="card-icon" /> Exercises Completed</h2>
<p>{exercisesCompleted} / {totalExercises}</p>
</div>
<div className="card leaderboard-card">
<h2><FaTrophy className="card-icon" /> Leaderboard</h2>
<ul>
           {leaderboard.map((user, index) => (
<li key={index}>
<span>{user.name}</span>
<span>{user.score}</span>
</li>
           ))}
</ul>
</div>
<div className="card hackathon-card">
<h2><FaRocket className="card-icon" /> Upcoming Hackathons</h2>
<button onClick={handleHackathonClick}>View & Join</button>
</div>
</div>
</div>
 );
};
export default UserDashboard;