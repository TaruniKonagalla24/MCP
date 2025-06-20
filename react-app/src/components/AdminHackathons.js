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
  const [newStatus, setNewStatus] = useState('');
  const [isReassessing, setIsReassessing] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const addHackathon = () => {
    if (!newName.trim()) {
      alert('Please enter hackathon name');
      return;
    }
    if (!newStatus) {
      alert('Please select hackathon status');
      return;
    }
    const newHackathon = {
      id: hackathons.length + 1,
      name: newName,
      status: newStatus,
    };
    setHackathons([...hackathons, newHackathon]);
    setNewName('');
    setNewStatus('');
  };

  const deleteHackathon = (id) => {
    setHackathons(hackathons.filter((h) => h.id !== id));
  };

  const handleReassessHackathon = () => {
    if (window.confirm("Are you sure you want to re-assess all submissions?")) {
      setIsReassessing(true);
      setTimeout(() => {
        alert("Hackathon submissions re-assessed successfully!");
        setIsReassessing(false);
      }, 2000);
    }
  };

  const handleUpdateProfile = () => {
    if (window.confirm("Are you sure you want to update user profiles?")) {
      setIsUpdatingProfile(true);
      setTimeout(() => {
        alert("User profiles updated successfully!");
        setIsUpdatingProfile(false);
      }, 2000);
    }
  };

  const generateReportCSV = () => {
    const header = ["ID", "Name", "Status"];
    const rows = hackathons.map(h => [h.id, h.name, h.status]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + header.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hackathon_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-hackathons-wrapper">
      <div className="admin-hackathons-container">
        <BackToAdminDashboard />
        <h2>Hackathon Management</h2>

        <div className="action-buttons">
          <button className="action-btn" onClick={handleReassessHackathon} disabled={isReassessing}>
            {isReassessing ? "Re-assessing..." : "Re-assess"}
          </button>

          <button className="action-btn" onClick={handleUpdateProfile} disabled={isUpdatingProfile}>
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>

          <button className="action-btn" onClick={generateReportCSV}>
            Generate Report
          </button>
        </div>

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
            <option value="">Select Status</option>
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
                  <button className="delete-btn" onClick={() => deleteHackathon(hackathon.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHackathons;
