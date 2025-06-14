import React, { useState } from 'react';
import './Teams.css';
import { FaUsers, FaStar, FaSearch, FaFilter, FaPlus, FaSignInAlt } from 'react-icons/fa';
const mockTeams = [
 {
   id: 1,
   name: 'Code Crushers',
   logo: '🛠️',
   difficulty: 'Hard',
   successRate: 92,
   members: ['Tarun', 'Divya', 'Ajay'],
 },
 {
   id: 2,
   name: 'Bug Bashers',
   logo: '🐞',
   difficulty: 'Medium',
   successRate: 75,
   members: ['You'],
 },
 {
   id: 3,
   name: 'Debug Ninjas',
   logo: '🥷',
   difficulty: 'Easy',
   successRate: 60,
   members: [],
 },
];
const Teams = () => {
 const [teams, setTeams] = useState(mockTeams);
 const [searchTerm, setSearchTerm] = useState('');
 const [difficultyFilter, setDifficultyFilter] = useState('');
 const [sortOption, setSortOption] = useState('');
 const [showCreateModal, setShowCreateModal] = useState(false);
 const [showJoinModal, setShowJoinModal] = useState(false);
 const [showDetailModal, setShowDetailModal] = useState(false);
 const [selectedTeam, setSelectedTeam] = useState(null);
 const [newTeamName, setNewTeamName] = useState('');
 const [selectedLogo, setSelectedLogo] = useState('');
 const logoOptions = ['🛠️', '🐞', '🚀', '🎯', '🤖', '🔥'];
 const handleCreateTeam = () => {
   if (newTeamName && selectedLogo) {
     const newTeam = {
       id: teams.length + 1,
       name: newTeamName,
       logo: selectedLogo,
       difficulty: 'Medium',
       successRate: 0,
       members: ['You'],
     };
     setTeams([...teams, newTeam]);
     setNewTeamName('');
     setSelectedLogo('');
     setShowCreateModal(false);
   }
 };
 const handleJoinTeam = (teamId) => {
   setTeams(teams.map(team => {
     if (team.id === teamId && team.members.length < 4 && !team.members.includes('You')) {
       return { ...team, members: [...team.members, 'You'] };
     }
     return team;
   }));
 };
 const handleLeaveTeam = (teamId) => {
   setTeams(teams.map(team => {
     if (team.id === teamId && team.members.includes('You')) {
       return {
         ...team,
         members: team.members.filter(member => member !== 'You')
       };
     }
     return team;
   }));
   setShowDetailModal(false);
 };
 const filteredTeams = teams
   .filter(team =>
     team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
     (difficultyFilter ? team.difficulty === difficultyFilter : true)
   )
   .sort((a, b) => {
     if (sortOption === 'name') return a.name.localeCompare(b.name);
     if (sortOption === 'successRate') return b.successRate - a.successRate;
     return 0;
   });
 return (
<div className="teams-page">
<h2 className="teams-heading">🚀 Explore Teams</h2>
<div className="teams-controls">
<div className="left-controls">
<input
           type="text"
           placeholder="Search teams..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
<select onChange={(e) => setDifficultyFilter(e.target.value)}>
<option value="">All Difficulties</option>
<option value="Easy">Easy</option>
<option value="Medium">Medium</option>
<option value="Hard">Hard</option>
</select>
<select onChange={(e) => setSortOption(e.target.value)}>
<option value="">Sort by</option>
<option value="name">Name</option>
<option value="successRate">Success Rate</option>
</select>
</div>
<div className="right-buttons">
<button onClick={() => setShowCreateModal(true)}><FaPlus /> Create Team</button>
{/* <button onClick={() => setShowJoinModal(true)}><FaSignInAlt /> Join Team</button> */}
</div>
</div>
<div className="team-grid">
       {filteredTeams.length === 0 ? (
<p className="no-teams">No teams available</p>
       ) : (
         filteredTeams.map(team => (
<div className="team-card" key={team.id} onClick={() => { setSelectedTeam(team); setShowDetailModal(true); }}>
<div className="team-logo">{team.logo}</div>
<h3 className="team-name">{team.name}</h3>
<span className={`difficulty-badge ${team.difficulty.toLowerCase()}`}>
               {team.difficulty}
</span>
<div className="members">
               {team.members.map((m, i) => (
<span key={i} className="member-avatar">{m}</span>
               ))}
</div>
<p className="success-rate">
<FaStar /> {team.successRate}% success
</p>
             {team.members.includes('You') ? (
<p className="your-team">You are in this team</p>
             ) : team.members.length < 4 ? (
<button className="join-btn" onClick={(e) => { e.stopPropagation(); handleJoinTeam(team.id); }}>
                 Join Team
</button>
             ) : (
<p className="full-team">Team Full</p>
             )}
</div>
         ))
       )}
</div>
     {/* Create Modal */}
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
<div className="logo-options">
             {logoOptions.map((logo, index) => (
<span
                 key={index}
                 className={`logo-option ${selectedLogo === logo ? 'selected' : ''}`}
                 onClick={() => setSelectedLogo(logo)}
>
                 {logo}
</span>
             ))}
</div>
<button onClick={handleCreateTeam}>Create</button>
<button className="close" onClick={() => setShowCreateModal(false)}>Close</button>
</div>
</div>
     )}
     {/* Join Modal */}
     {showJoinModal && (
<div className="modal">
<div className="modal-content">
<h3>Join a Team</h3>
<p>Click the "Join" button on a team card to join a team.</p>
<button className="close" onClick={() => setShowJoinModal(false)}>Close</button>
</div>
</div>
     )}
     {/* Detail Modal */}
     {showDetailModal && selectedTeam && (
<div className="modal">
<div className="modal-content">
<h3>{selectedTeam.logo} {selectedTeam.name}</h3>
<p><strong>Difficulty:</strong> {selectedTeam.difficulty}</p>
<p><strong>Success Rate:</strong> {selectedTeam.successRate}%</p>
<p><strong>Members:</strong></p>
<div className="members">
             {selectedTeam.members.map((m, i) => (
<span key={i} className="member-avatar">{m}</span>
             ))}
</div>
           {selectedTeam.members.includes('You') && (
<button onClick={() => handleLeaveTeam(selectedTeam.id)} className="leave-btn">
               Get Out of Team
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