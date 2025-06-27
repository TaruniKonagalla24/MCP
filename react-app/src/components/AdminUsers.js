import React, { useState, useEffect } from 'react';
import './AdminUsers.css';
import api from '../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    skill: '',
    minScore: '',
    learningPath: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/Hackathon/AdminLeaderboard');
        // Map the API response to match our expected format
        const formattedUsers = response.data.map((user, index) => ({
          id: index + 1,
          username: user.username,
          progress: user.progresspercentage > 100 ? 100 : user.progresspercentage, // Cap progress at 100%
          skill: user.languagesknown,
          score: user.points,
          learningPath: user.learningpath
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

  const learningPaths = [...new Set(users.map(user => user.learningPath))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'minScore') {
      if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
        setFilters({ ...filters, [name]: value });
      }
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const filteredUsers = users.filter(user => {
    const skillMatch = user.skill.toLowerCase().includes(filters.skill.toLowerCase());
    const scoreMatch = filters.minScore === '' || user.score >= parseInt(filters.minScore);
    const learningPathMatch = filters.learningPath === '' || user.learningPath === filters.learningPath;
    return skillMatch && scoreMatch && learningPathMatch;
  });

  if (loading) {
    return <div className="admin-users-wrapper">Loading...</div>;
  }

  if (error) {
    return <div className="admin-users-wrapper">Error: {error}</div>;
  }

  return (
    <div className="admin-users-wrapper">
      <div className="admin-users-container">
        <h2 className="admin-users-title">Users & Progress</h2>

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
              <option key={index} value={path}>{path}</option>
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
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.skill}</td>
                <td>{user.score}</td>
                <td>{user.learningPath}</td>
                <td>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
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