import React, { useState, useEffect } from 'react';
import './HackathonPage.css';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';

const HackathonPage = () => {
  const [filters, setFilters] = useState({ skill: 'All', difficulty: 'All' });
  const [challenges, setChallenges] = useState([]);
  const [hackathonStats, setHackathonStats] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) throw new Error('User not authenticated');

        const parsedUser = JSON.parse(userData);
        if (!parsedUser?.id) throw new Error('Invalid user data');

        const challengesResponse = await api.post(
          '/Hackathon/Getmyhackathons',
          parsedUser.id.toString(),
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*'
            }
          }
        );

        const statsResponse = await api.get('/Hackathon/hackathonstatus');

        setChallenges(challengesResponse.data);
        setHackathonStats(statsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewChallenge = (challengeId) => {
    navigate(`/coding/${challengeId}`);
  };

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns = {};
      challenges.forEach((c) => {
        const diff = new Date(c.startTime) - new Date();
        const seconds = Math.max(0, Math.floor(diff / 1000));
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        newCountdowns[c.id] = `${h}h ${m}m ${s}s`;
      });
      setCountdowns(newCountdowns);
    };

    if (challenges.length > 0) {
      updateCountdowns();
      const interval = setInterval(updateCountdowns, 1000);
      return () => clearInterval(interval);
    }
  }, [challenges]);

  useEffect(() => {
    const filtered = challenges.filter((c) => {
      const skillMatch = filters.skill === 'All' || c.skill === filters.skill;
      const diffMatch = filters.difficulty === 'All' || c.difficulty === filters.difficulty;
      return skillMatch && diffMatch;
    });
    setFilteredChallenges(filtered);
  }, [filters, challenges]);

  const getHackathonStats = (hackathonId) => {
    const stats = hackathonStats.find(stat => stat.hackathonid === hackathonId.toString());
    return {
      participation: stats ? parseInt(stats.participationpercent) : 0,
      success: stats ? parseInt(stats.successpercentage) : 0
    };
  };

  const getDifficultyClass = (level) => {
    switch (level) {
      case 'Easy': return 'difficulty-badge difficulty-easy';
      case 'Medium': return 'difficulty-badge difficulty-medium';
      case 'Hard': return 'difficulty-badge difficulty-hard';
      default: return 'difficulty-badge';
    }
  };

  if (loading) {
    return <div className="hackathon-page loading">Loading challenges...</div>;
  }

  if (error) {
    return (
      <div className="hackathon-page error">
        <h3>Error Loading Challenges</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="hackathon-page">
      {/* HEADER: Title + Filters in 1 row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '20px 0',
        position: 'relative'
      }}>
        <h2 style={{
    fontWeight: 'bold',
    position: 'absolute',
    left: '20%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    fontSize: '24px'
  }}>
          <FaTrophy style={{ marginRight: '10px', color: '#F6AD55' }} />
         Hackathon Challenges
        </h2>

        <div style={{
    display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginLeft: '570px',
  }}>
          <label>
            Skill:
            <select
              value={filters.skill}
              onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
              style={{ marginLeft: '5px', padding: '5px' }}
            >
              <option value="All">All</option>
              <option value="Logic">Logic</option>
              <option value="Strings">Strings</option>
              <option value="SQL">SQL</option>
              <option value="Data Processing">Data Processing</option>
            </select>
          </label>

          <label>
            Difficulty:
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              style={{ marginLeft: '5px', padding: '5px' }}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>
      </div>

      {/* CHALLENGE LIST */}
      <div className="challenge-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((c) => {
            const stats = getHackathonStats(c.id);
            return (
              <div key={c.id} className="challenge-card">
                <h3>{c.problem}</h3>
                <p><strong>Skill:</strong> <span className="skill-text">{c.skill}</span></p>
                <p><strong>Difficulty:</strong> <span className={getDifficultyClass(c.difficulty)}>{c.difficulty}</span></p>
                <p><strong>Start Time:</strong> {new Date(c.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(c.endTime).toLocaleString()}</p>
                <p><strong>Starts In:</strong> {countdowns[c.id] || 'Calculating...'}</p>

                <div className="challenge-metrics">
                  <div className="metric">
                    <div className="metric-label">👥 Participation: {stats.participation}%</div>
                    <div className="progress-bar">
                      <div className="progress participation-progress" style={{ width: `${stats.participation}%` }}></div>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">🏆 Success Rate: {stats.success}%</div>
                    <div className="progress-bar">
                      <div className="progress success-progress" style={{ width: `${stats.success}%` }}></div>
                    </div>
                  </div>
                </div>

                <button className="view-button" onClick={() => handleViewChallenge(c.id)}>
                  View Challenge
                </button>
              </div>
            );
          })
        ) : (
          <div className="no-challenges">No challenges match your filters</div>
        )}
      </div>
    </div>
  );
};

export default HackathonPage;
