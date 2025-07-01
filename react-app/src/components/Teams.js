import React, { useState, useEffect } from 'react';
import './Teams.css';
import { FaUsers, FaSearch, FaFilter, FaPlus, FaSignInAlt, FaCalendarAlt } from 'react-icons/fa';
import api from '../api/axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMajor, setNewTeamMajor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) throw new Error('User not authenticated');
        
        const parsedUser = JSON.parse(userData);
        if (!parsedUser?.id) throw new Error('Invalid user data');
        
        setUser(parsedUser);

        const response = await api.post(
          '/Team/GetmyTeams',
          parsedUser.id.toString(),
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*'
            }
          }
        );

        setTeams(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTeams = teams
    .filter(team =>
      team.teamname.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (majorFilter ? team.teamMajor === majorFilter : true) &&
      (dateFilter ? {
        'today': new Date(team.createdOn).toDateString() === new Date().toDateString(),
        'this-week': isDateThisWeek(new Date(team.createdOn)),
        'this-month': new Date(team.createdOn).getMonth() === new Date().getMonth()
      }[dateFilter] : true)
    )
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

  function isDateThisWeek(date) {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  const handleCreateTeam = async () => {
    if (newTeamName && newTeamMajor && user) {
      try {
        await api.post(
          '/Team/createteam',
          {
            teamname: newTeamName,
            createdBy: user.username,
            teamMajor: newTeamMajor
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*'
            }
          }
        );

        setNewTeamName('');
        setNewTeamMajor('');
        setShowCreateModal(false);
      } catch (err) {
        console.error('Error creating team:', err);
        alert('Failed to create team. Please try again.');
      }
    }
  };

  const handleJoinTeam = async (teamId) => {
    if (!user) return;

    try {
      await api.post(
        '/Team/jointeam',
        {
          teamid: teamId.toString(),
          userid: user.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        }
      );

      setTeams(teams.map(team => {
        if (team.id === teamId) {
          return { ...team, joined: true };
        }
        return team;
      }));

      if (selectedTeam?.id === teamId) {
        setSelectedTeam({ ...selectedTeam, joined: true });
      }
    } catch (err) {
      console.error('Error joining team:', err);
      alert('Failed to join team. Please try again.');
    }
  };

  if (loading) return <div className="teams-page loading">Loading teams...</div>;

  if (error) {
    return (
      <div className="teams-page error">
        <h3>Error Loading Teams</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  const teamMajors = [...new Set(teams.map(team => team.teamMajor))];

  return (
    <div className="teams-page">
      {/* Header with centered title and filters in one row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <h2 style={{
          fontWeight: 'bold',
          position: 'absolute',
          left: '30%',
          transform: 'translateX(-50%)',
          margin: 0,
        }}>
          🚀 Explore Teams
        </h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginLeft: 'auto',
          }}
        >
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '0.95rem',
              width: '180px',
            }}
          />

          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '0.95rem',
              width: '160px',
            }}
          >
            <option value="">All Topics</option>
            {teamMajors.map((major, index) => (
              <option key={index} value={major}>{major}</option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '0.95rem',
              width: '160px',
            }}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <FaPlus style={{ marginRight: '6px' }} />
            Create
          </button>
        </div>
      </div>

      {/* Team cards */}
      <div className="team-grid">
        {filteredTeams.length === 0 ? (
          <p className="no-teams">No teams available</p>
        ) : (
          filteredTeams.map(team => (
            <div
              className="team-card"
              key={team.id}
              onClick={() => { setSelectedTeam(team); setShowDetailModal(true); }}
            >
              <div className="team-logo">{team.teamname.charAt(0)}</div>
              <h3 className="team-name">{team.teamname}</h3>
              <span className="team-major">{team.teamMajor}</span>
              <p className="created-by">Created by: {team.createdBy}</p>
              <p className="created-on"><FaCalendarAlt /> {new Date(team.createdOn).toLocaleDateString()}</p>
              {team.joined ? (
                <p className="your-team">You are in this team</p>
              ) : (
                <button
                  className="join-btn"
                  onClick={(e) => { e.stopPropagation(); handleJoinTeam(team.id); }}
                >
                  Join Team
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Team</h3>
            <input
              type="text"
              placeholder="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <select
              value={newTeamMajor}
              onChange={(e) => setNewTeamMajor(e.target.value)}
            >
              <option value="">Select Team Topic</option>
              {teamMajors.map((major, index) => (
                <option key={index} value={major}>{major}</option>
              ))}
            </select>
            <button onClick={handleCreateTeam}>Create</button>
            <button className="close" onClick={() => setShowCreateModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Team Detail Modal */}
      {showDetailModal && selectedTeam && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedTeam.teamname.charAt(0)} {selectedTeam.teamname}</h3>
            <p><strong>Topic:</strong> {selectedTeam.teamMajor}</p>
            <p><strong>Created by:</strong> {selectedTeam.createdBy}</p>
            <p><strong>Created on:</strong> {new Date(selectedTeam.createdOn).toLocaleString()}</p>
            {selectedTeam.joined ? (
              <p className="your-team-detail">You are a member of this team</p>
            ) : (
              <button
                onClick={() => handleJoinTeam(selectedTeam.id)}
                className="join-btn"
              >
                Join Team
              </button>
            )}
            <button className="close" onClick={() => setShowDetailModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
