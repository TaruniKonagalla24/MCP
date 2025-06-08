import React, { useEffect, useState } from 'react';
import './Hackathon.css';
import { useNavigate } from 'react-router-dom';

const HACKATHON_DURATION_HOURS = 48;

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [timers, setTimers] = useState({});
  const [joinedInfo, setJoinedInfo] = useState(() => {
    const saved = localStorage.getItem('joinedInfo');
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    const mockHackathons = [
      {
        id: 1,
        name: 'React Hackathon',
        startTime: new Date('2025-07-01T10:00:00'),
        description: 'Build a complete React project in 48 hours.',
      },
      {
        id: 2,
        name: 'AI Challenge',
        startTime: new Date('2025-07-15T09:30:00'),
        description: 'Tackle real-world problems using AI/ML models.',
      },
      {
        id: 3,
        name: 'Backend Builder',
        startTime: new Date('2025-08-05T14:00:00'),
        description: 'Create RESTful APIs and database schemas.',
      }
    ];

    setHackathons(mockHackathons);

    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimers = {};

      mockHackathons.forEach(h => {
        const start = new Date(h.startTime);
        const end = new Date(start.getTime() + HACKATHON_DURATION_HOURS * 60 * 60 * 1000);
        const joinedAt = joinedInfo[h.id]?.joinedAt ? new Date(joinedInfo[h.id].joinedAt) : null;

        if (joinedAt) {
          const elapsed = now - joinedAt;
          const total = end - joinedAt;
          const progress = Math.min((elapsed / total) * 100, 100).toFixed(0);
          updatedTimers[h.id] = {
            label: `Ends in: ${formatTime(end - now)}`,
            progress
          };
        } else {
          const timeLeft = start - now;
          updatedTimers[h.id] = {
            label: timeLeft <= 0 ? 'Started' : `Starts in: ${formatTime(timeLeft)}`,
            progress: 0
          };
        }
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [joinedInfo]);

  const formatTime = (ms) => {
    if (ms <= 0) return '0s';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const joinHackathon = (id) => {
    if (!joinedInfo[id]) {
      const newInfo = {
        ...joinedInfo,
        [id]: { joinedAt: new Date().toISOString() }
      };
      setJoinedInfo(newInfo);
      localStorage.setItem('joinedInfo', JSON.stringify(newInfo));
      alert('Successfully joined!');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleViewChallenge = (id) => {
    navigate(`/challenge/${id}`);
  };

  const renderLeaderboard = () => (
    <ul className="leaderboard">
      <li><strong>Leaderboard:</strong></li>
      <li>🥇 Alice - 98 pts</li>
      <li>🥈 Bob - 87 pts</li>
      <li>🥉 Charlie - 75 pts</li>
    </ul>
  );

  return (
    <div className="hackathon-container">
      <button className="back-button" onClick={handleBack}>← Back to Dashboard</button>
      <h2>Available Hackathons</h2>
      <div className="hackathon-list">
        {hackathons.map(h => (
          <div className="hackathon-card" key={h.id}>
            <h3>{h.name}</h3>
            <p>{h.description}</p>
            <p className="timer">{timers[h.id]?.label || 'Loading...'}</p>

            {joinedInfo[h.id] ? (
              <>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${timers[h.id]?.progress || 0}%` }}>
                    {timers[h.id]?.progress || 0}%
                  </div>
                </div>
                <button className="view-btn" onClick={() => handleViewChallenge(h.id)}>View Challenge</button>
                {renderLeaderboard()}
              </>
            ) : (
              <button onClick={() => joinHackathon(h.id)}>Join</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonPage;
