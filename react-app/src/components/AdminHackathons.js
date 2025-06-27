import React, { useState, useEffect } from 'react';
import './AdminHackathons.css';
import BackToAdminDashboard from './BackToAdminDashboard';
import api from '../api/axios';

const AdminHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'upcoming', 'active', 'completed'

  useEffect(() => {
    fetchHackathons();
  }, []);

  useEffect(() => {
    if (hackathons.length > 0) {
      filterHackathons();
    }
  }, [statusFilter, hackathons]);

  const fetchHackathons = async () => {
    try {
      const response = await api.get('/Hackathon/getallhackathons');
      setHackathons(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      setLoading(false);
    }
  };

  const filterHackathons = () => {
    if (statusFilter === 'all') {
      setFilteredHackathons(hackathons);
    } else {
      const filtered = hackathons.filter(hackathon => {
        const status = getStatus(hackathon.startTime, hackathon.endTime);
        return status.toLowerCase() === statusFilter;
      });
      setFilteredHackathons(filtered);
    }
  };

  const deleteHackathon = async (id) => {
    if (window.confirm(`Are you sure you want to delete this hackathon?`)) {
      try {
        await api.post('/Hackathon/delethackathon', id);
        fetchHackathons(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting hackathon:', error);
      }
    }
  };

  const generateReport = async (id) => {
    setIsGeneratingReport(true);
    try {
      const response = await api.post('/Hackathon/generatereport', id);
      
      // Convert the response data to CSV
      const header = ["Username", "Score", "Last Submission", "Date Registered", "Result"];
      const rows = response.data.map(item => [
        item.username,
        item.score,
        item.lastsubmission,
        item.dateRegistered,
        item.result
      ]);

      let csvContent = "data:text/csv;charset=utf-8," 
        + header.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `hackathon_${id}_report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const getStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'Upcoming';
    if (now >= start && now <= end) return 'Active';
    return 'Completed';
  };

  if (loading) {
    return (
      <div className="admin-hackathons-wrapper">
        <div className="admin-hackathons-container">
          <BackToAdminDashboard />
          <h2>Hackathon Management</h2>
          <p>Loading hackathons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-hackathons-wrapper">
      <div className="admin-hackathons-container">
        <BackToAdminDashboard />
        <h2>Hackathon Management</h2>

        <div className="filter-controls">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Hackathons</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
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
            {filteredHackathons.length > 0 ? (
              filteredHackathons.map((hackathon) => {
                const status = getStatus(hackathon.startTime, hackathon.endTime);
                return (
                  <tr key={hackathon.id}>
                    <td>{hackathon.id}</td>
                    <td>{hackathon.problem}</td>
                    <td>{status}</td>
                    <td className="actions-cell">
                      <button 
                        className="report-btn" 
                        onClick={() => generateReport(hackathon.id)}
                        disabled={isGeneratingReport}
                      >
                        {isGeneratingReport ? "Generating..." : "Generate Report"}
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => deleteHackathon(hackathon.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  No hackathons found matching the selected filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHackathons;