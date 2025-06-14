import React from 'react';
import './LevelProgressBar.css';

const LevelProgressBar = ({ score }) => {
  const percentage = Math.min((score / 300) * 100, 100);
  const strokeDashoffset = 314 - (314 * percentage) / 100;

  return (
    <div className="level-progress-container">
      <svg className="progress-ring" width="120" height="120">
        <circle className="bg" cx="60" cy="60" r="50" />
        <circle
          className="progress"
          cx="60"
          cy="60"
          r="50"
          style={{ strokeDashoffset }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="score-text">
          {Math.floor(percentage)}%
        </text>
      </svg>
    </div>
  );
};

export default LevelProgressBar;