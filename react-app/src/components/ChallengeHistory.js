import React, { useEffect, useState } from 'react';
import './ChallengeHistory.css';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaRedo } from 'react-icons/fa';
import api from '../api/axios'; 

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
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || 0;
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const userid = getUserId();
        const response = await api.post('/Hackathon/Getmyhackathons', userid, {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
        });
        setHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch challenge history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const mapStatus = (result, score) => {
    if (result === null && score === null) return 'in-progress';
    if (result && result.toLowerCase() === 'failed') return 'failed';
    return 'completed';
  };

  const handleReattempt = () => {
    alert('Re-attempt API under development...');
  };

  if (loading) return <p>Loading Challenge History...</p>;

  return (
    <div className="challenge-history-container">
      <h2 className="history-heading">Challenge History</h2>
      <div className="history-table">
        {history.map((challenge, index) => {
          const status = mapStatus(challenge.result, challenge.score);
          const formattedDate = new Date(challenge.startTime).toLocaleDateString();

          return (
            <div className="history-row" key={index}>
              <div className="challenge-name">{challenge.problem}</div>
              <div className="challenge-date">{formattedDate}</div>
              <div className={`challenge-status ${status}`}>
                {getStatusIcon(status)} {status}
              </div>
              <div className="challenge-score">
                {challenge.score !== null ? `${challenge.score} pts` : '—'}
              </div>
              <div className="challenge-actions">
                <button className="reattempt-btn" onClick={handleReattempt}>
                  <FaRedo /> Re-attempt
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeHistory;
