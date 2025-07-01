import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaRedo, FaHistory } from 'react-icons/fa';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || 0;
  };

  const handleViewChallenge = (challengeId) => {
    console.log('challenge IDs from challenge screen:' + challengeId);
    navigate(`/coding/${challengeId}`);
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

  if (loading) {
    return <p style={{ marginLeft: '70px', padding: '20px', fontSize: '18px' }}>Loading Challenge History...</p>;
  }

  return (
    <div
      style={{
        marginLeft: '40px',
        padding: '40px 20px',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2
          style={{
            fontWeight: 'bold',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            color: '#2d3748',
          }}
        >
          <FaHistory style={{ marginRight: '10px', color: '#718096' }} />
          Challenge History
        </h2>

        <div style={{ display: 'grid', gap: '15px' }}>
          {history.map((challenge, index) => {
            const status = mapStatus(challenge.result, challenge.score);
            const formattedDate = new Date(challenge.startTime).toLocaleDateString();

            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                  alignItems: 'center',
                  background: '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  fontSize: '16px',
                }}
              >
                <div style={{ fontWeight: '500', fontSize: '18px' }}>{challenge.problem}</div>
                <div style={{ color: '#4a5568', fontSize: '16px' }}>{formattedDate}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textTransform: 'capitalize',
                    color:
                      status === 'completed'
                        ? '#16a34a'
                        : status === 'failed'
                        ? '#dc2626'
                        : '#f59e0b',
                    fontSize: '16px',
                  }}
                >
                  {getStatusIcon(status)} {status}
                </div>
                <div style={{ textAlign: 'center', fontSize: '16px' }}>
                  {challenge.score !== null ? `${challenge.score} pts` : '—'}
                </div>
                <button
                  onClick={() => handleViewChallenge(challenge.id)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14px',
                  }}
                >
                  <FaRedo /> Re-attempt
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChallengeHistory;
