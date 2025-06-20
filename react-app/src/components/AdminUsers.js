import React, { useState } from 'react';
import './AdminUsers.css';

// Mock Data with additional fields for filtering
const usersMock = [
  { id: 1, username: 'user1', progress: 70, skill: 'React', score: 85, learningPath: 'Frontend' },
  { id: 2, username: 'user2', progress: 40, skill: 'Node.js', score: 60, learningPath: 'Backend' },
  { id: 3, username: 'user3', progress: 90, skill: 'Python', score: 92, learningPath: 'Data Science' },
  { id: 4, username: 'user4', progress: 55, skill: 'React', score: 75, learningPath: 'Frontend' },
];

const AdminUsers = () => {
  const [filters, setFilters] = useState({
    skill: '',
    minScore: '',
    learningPath: ''
  });

  const learningPaths = [...new Set(usersMock.map(user => user.learningPath))];

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

  const filteredUsers = usersMock.filter(user => {
    const skillMatch = user.skill.toLowerCase().includes(filters.skill.toLowerCase());
    const scoreMatch = filters.minScore === '' || user.score >= parseInt(filters.minScore);
    const learningPathMatch = filters.learningPath === '' || user.learningPath === filters.learningPath;
    return skillMatch && scoreMatch && learningPathMatch;
  });

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
