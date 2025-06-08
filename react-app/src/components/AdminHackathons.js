import React, { useState } from 'react';
import './AdminHackathons.css';
import BackToAdminDashboard from './BackToAdminDashboard';
const initialHackathons = [
  { id: 1, name: 'April Code Sprint', status: 'Active' },
  { id: 2, name: 'May Challenge', status: 'Upcoming' },
  { id: 3, name: 'June Hackfest', status: 'Completed' },
];

const AdminHackathons = () => {
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState('Upcoming');

  const addHackathon = () => {
    if (!newName.trim()) {
      alert('Please enter hackathon name');
      return;
    }
    const newHackathon = {
      id: hackathons.length + 1,
      name: newName,
      status: newStatus,
    };
    setHackathons([...hackathons, newHackathon]);
    setNewName('');
    setNewStatus('Upcoming');
  };

  const deleteHackathon = (id) => {
    setHackathons(hackathons.filter((h) => h.id !== id));
  };

  return (
    <div className="admin-hackathons-container">
      <BackToAdminDashboard />
      <h2>Manage Hackathons</h2>

      <div className="add-hackathon-form">
        <input
          type="text"
          placeholder="New Hackathon Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={addHackathon}>Add Hackathon</button>
      </div>

      <table className="hackathons-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hackathons.map((hackathon) => (
            <tr key={hackathon.id}>
              <td>{hackathon.id}</td>
              <td>{hackathon.name}</td>
              <td>{hackathon.status}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteHackathon(hackathon.id)}
                >
                  Delete
                </button>
                {/* You can add Edit feature here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHackathons;
