// Leaderboard.js
import React from 'react';
import './Leaderboard.css';

const mockData = [
  { rank: 1, name: 'Alice', score: 980, badges: ['🔥', '🏆'] },
  { rank: 2, name: 'Bob', score: 910, badges: ['⭐', '⚡'] },
  { rank: 3, name: 'Charlie', score: 860, badges: ['💡'] },
  { rank: 4, name: 'David', score: 800, badges: [] },
  { rank: 5, name: 'Eva', score: 780, badges: ['🥇'] },
];

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Badges</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{user.badges.join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
