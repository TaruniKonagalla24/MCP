import React from 'react';
import './ChallengeHistory.css';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaRedo } from 'react-icons/fa';
const mockHistory = [
 { name: 'Array Mastery', date: '2025-06-01', status: 'completed', score: 92 },
 { name: 'React Basics', date: '2025-06-03', status: 'failed', score: 45 },
 { name: 'Backend APIs', date: '2025-06-05', status: 'in-progress', score: null },
 { name: 'SQL Logic', date: '2025-06-06', status: 'completed', score: 87 },
];
const getStatusIcon = (status) => {
 switch (status) {
   case 'completed':
     return <FaCheckCircle className="status-icon completed" />;
   case 'failed':
     return <FaTimesCircle className="status-icon failed" />;
   case 'in-progress':
     return <FaHourglassHalf className="status-icon in-progress" />;
   default:
     return null;
 }
};
const ChallengeHistory = () => {
 return (
<div className="challenge-history-container">
<h2 className="history-heading">Challenge History</h2>
<div className="history-table">
       {mockHistory.map((challenge, index) => (
<div className="history-row" key={index}>
<div className="challenge-name">{challenge.name}</div>
<div className="challenge-date">{challenge.date}</div>
<div className={`challenge-status ${challenge.status}`}>
             {getStatusIcon(challenge.status)} {challenge.status}
</div>
<div className="challenge-score">
             {challenge.score !== null ? `${challenge.score} pts` : '—'}
</div>
<div className="challenge-actions">
<button className="reattempt-btn"><FaRedo /> Re-attempt</button>
</div>
</div>
       ))}
</div>
</div>
 );
};
export default ChallengeHistory;