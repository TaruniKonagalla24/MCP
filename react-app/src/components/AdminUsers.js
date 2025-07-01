import React, { useState, useEffect } from 'react';
import './AdminUsers.css';
import api from '../api/axios';
import { FaUsers } from 'react-icons/fa';
const AdminUsers = () => {
 const [users, setUsers] = useState([]);
 const [filters, setFilters] = useState({
   skill: '',
   minScore: '',
   learningPath: '',
 });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 // Fetch data
 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const response = await api.get('/Hackathon/AdminLeaderboard');
       const formattedUsers = response.data.map((user, index) => ({
         id: index + 1,
         username: user.username,
         progress: Math.min(user.progresspercentage || 0, 100),
         skill: user.languagesknown || '',
         score: user.points || 0,
         learningPath: user.learningpath || '',
       }));
       setUsers(formattedUsers);
       setLoading(false);
     } catch (err) {
       setError(err.message);
       setLoading(false);
     }
   };
   fetchUsers();
 }, []);
 const learningPaths = [...new Set(users.map((user) => user.learningPath))];
 const handleFilterChange = (e) => {
   const { name, value } = e.target;
   setFilters((prevFilters) => ({
     ...prevFilters,
     [name]: value,
   }));
 };
 const filteredUsers = users.filter((user) => {
   const skillMatch = user.skill.toLowerCase().includes(filters.skill.toLowerCase());
   const scoreMatch = filters.minScore === '' || user.score >= parseInt(filters.minScore);
   const pathMatch = filters.learningPath === '' || user.learningPath === filters.learningPath;
   return skillMatch && scoreMatch && pathMatch;
 });
 const getProgressClass = (value) => {
   if (value >= 100) return 'progress-bar-100';
   if (value >= 75) return 'progress-bar-75';
   if (value >= 50) return 'progress-bar-50';
   return 'progress-bar-25';
 };
 if (loading) return <div className="admin-users-wrapper">Loading...</div>;
 if (error) return <div className="admin-users-wrapper">Error: {error}</div>;
 return (
<div className="admin-users-wrapper">
<div className="admin-users-container">
<h2 className="admin-users-title" style={{ fontWeight: 'bold' }}>
   <FaUsers style={{ marginRight: '10px', color: '#4A90E2' }} />
  Users & Progress</h2>
<div className="filter-bar">
<input
           type="text"
           name="skill"
           placeholder="Search by Skill"
           value={filters.skill}
           onChange={handleFilterChange}
         />
<input
           type="number"
           name="minScore"
           placeholder="Minimum Score (0-100)"
           value={filters.minScore}
           onChange={handleFilterChange}
           min="0"
           max="100"
         />
<select
           name="learningPath"
           value={filters.learningPath}
           onChange={handleFilterChange}
>
<option value="">All Learning Paths</option>
           {learningPaths.map((path, index) => (
<option key={index} value={path}>
               {path}
</option>
           ))}
</select>
</div>
<table className="users-table">
<thead>
<tr>
<th>User ID</th>
<th>Username</th>
<th>Skill</th>
<th>Score</th>
<th>Learning Path</th>
<th>Progress</th>
</tr>
</thead>
<tbody>
           {filteredUsers.map((user) => (
<tr key={user.id} className="user-row">
<td data-label="User ID">{user.id}</td>
<td data-label="Username">{user.username}</td>
<td data-label="Skill">
                 {user.skill.split(',').map((skill, i) => (
<span key={i} className="skill-badge">{skill.trim()}</span>
                 ))}
</td>
<td data-label="Score">{user.score}</td>
<td data-label="Learning Path">{user.learningPath}</td>
<td data-label="Progress">
<div className="progress-bar-container">
<div
                     className={`progress-bar ${getProgressClass(user.progress)}`}
                     style={{ width: `${user.progress}%` }}
>
                     {user.progress}%
</div>
</div>
</td>
</tr>
           ))}
</tbody>
</table>
</div>
</div>
 );
};
export default AdminUsers;