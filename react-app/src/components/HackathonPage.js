// HackathonPage.js
import React, { useState, useEffect } from 'react';
import './HackathonPage.css';
const challenges = [
 {
   title: 'Frontend Wizardry',
   skill: 'React.js',
   difficulty: 'Medium',
   startDate: '2025-06-15T10:00:00',
   participation: 78,
   successRate: 52,
 },
 {
   title: 'API Mastery',
   skill: 'Node.js',
   difficulty: 'Hard',
   startDate: '2025-06-20T10:00:00',
   participation: 63,
   successRate: 40,
 },
 {
   title: 'UI/UX Challenge',
   skill: 'Design',
   difficulty: 'Easy',
   startDate: '2025-06-25T10:00:00',
   participation: 90,
   successRate: 70,
 },
];
const HackathonPage = () => {
 const [filters, setFilters] = useState({ skill: 'All', difficulty: 'All' });
 const [filteredChallenges, setFilteredChallenges] = useState(challenges);
 const [countdowns, setCountdowns] = useState({});
 useEffect(() => {
   const updateCountdowns = () => {
     const newCountdowns = {};
     challenges.forEach((c) => {
       const diff = new Date(c.startDate) - new Date();
       const seconds = Math.max(0, Math.floor(diff / 1000));
       const h = Math.floor(seconds / 3600);
       const m = Math.floor((seconds % 3600) / 60);
       const s = seconds % 60;
       newCountdowns[c.title] = `${h}h ${m}m ${s}s`;
     });
     setCountdowns(newCountdowns);
   };
   updateCountdowns();
   const interval = setInterval(updateCountdowns, 1000);
   return () => clearInterval(interval);
 }, []);
 useEffect(() => {
   const filtered = challenges.filter((c) => {
     const skillMatch = filters.skill === 'All' || c.skill === filters.skill;
     const diffMatch = filters.difficulty === 'All' || c.difficulty === filters.difficulty;
     return skillMatch && diffMatch;
   });
   setFilteredChallenges(filtered);
 }, [filters]);
 const getDifficultyClass = (level) => {
   switch (level) {
     case 'Easy': return 'difficulty-badge difficulty-easy';
     case 'Medium': return 'difficulty-badge difficulty-medium';
     case 'Hard': return 'difficulty-badge difficulty-hard';
     default: return 'difficulty-badge';
   }
 };
 return (
<div className="hackathon-page">
<div className="hackathon-header">
<h2>Hackathon Challenges</h2>
<div className="filters">
<label>Filter by Skill:
<select onChange={(e) => setFilters({ ...filters, skill: e.target.value })}>
<option>All</option>
<option>React.js</option>
<option>Node.js</option>
<option>Design</option>
</select>
</label>
<label>Filter by Difficulty:
<select onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
<option>All</option>
<option>Easy</option>
<option>Medium</option>
<option>Hard</option>
</select></label>
</div>
</div>
<div className="challenge-list">
       {filteredChallenges.map((c, idx) => (
<div key={idx} className="challenge-card">
<h3>{c.title}</h3>
<p><strong>Skill:</strong> {c.skill}</p>
<p>
<strong>Difficulty:</strong>
<span className={getDifficultyClass(c.difficulty)}>{c.difficulty}</span>
</p>
<p><strong>Start Date:</strong> {new Date(c.startDate).toLocaleDateString()}</p>
<p><strong>Starts In:</strong> {countdowns[c.title]}</p>
<div className="challenge-metrics">
<div className="metric">
<div className="metric-label">👥 Participation: {c.participation}%</div>
<div className="progress-bar">
<div className="progress participation-progress" style={{ width: `${c.participation}%` }}></div>
</div>
</div>
<div className="metric">
<div className="metric-label">🏆 Success Rate: {c.successRate}%</div>
<div className="progress-bar">
<div className="progress success-progress" style={{ width: `${c.successRate}%` }}></div>
</div>
</div>
</div>
<button className="view-button">View Challenge</button>
</div>
       ))}
</div>
</div>
 );
};
export default HackathonPage;