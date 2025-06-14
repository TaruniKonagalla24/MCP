// RecommendedChallenges.js
import React from 'react';
import './RecommendedChallenges.css';

const challenges = [
  { id: 1, title: 'React Task Tracker', tags: ['React', 'JavaScript'] },
  { id: 2, title: 'Data Structures Quiz', tags: ['Algorithms'] },
  { id: 3, title: 'API Integration', tags: ['JavaScript', 'API'] },
  { id: 4, title: 'Responsive Layout', tags: ['CSS', 'HTML'] },
  { id: 5, title: 'Node Auth', tags: ['Node.js', 'Backend'] }
];

const RecommendedChallenges = ({ skills }) => {
  const filtered = challenges.filter(challenge =>
    challenge.tags.some(tag => skills.includes(tag))
  );

  return (
    <div className="recommended-challenges">
      <h3>Recommended Challenges</h3>
      {filtered.length > 0 ? (
        <ul>
          {filtered.map(challenge => (
            <li key={challenge.id}>{challenge.title}</li>
          ))}
        </ul>
      ) : (
        <p>No challenges matched your skills yet. Try adding more skills!</p>
      )}
    </div>
  );
};

export default RecommendedChallenges;
