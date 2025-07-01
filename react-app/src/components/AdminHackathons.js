import React, { useState, useEffect } from 'react';
import './AdminHackathons.css';
import api from '../api/axios';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 
const AdminHackathons = ({ setIsLoggedIn, setUserRole }) => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
 
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchHackathons();
  }, []);
 
  useEffect(() => {
    filterHackathons();
  }, [statusFilter, hackathons]);
 
  const fetchHackathons = async () => {
    try {
      const response = await api.get('/Hackathon/getallhackathons');
      setHackathons(response.data);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    }
  };
 
  const filterHackathons = () => {
    if (statusFilter === 'all') {
      setFilteredHackathons(hackathons);
    } else {
      const filtered = hackathons.filter(h => {
        const status = getStatus(h.startTime, h.endTime);
        return status.toLowerCase() === statusFilter;
      });
      setFilteredHackathons(filtered);
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
 
  const deleteHackathon = async (id) => {
    if (window.confirm('Are you sure you want to delete this hackathon?')) {
      try {
        await api.post('/Hackathon/delethackathon', id);
        fetchHackathons();
      } catch (error) {
        console.error('Error deleting hackathon:', error);
      }
    }
  };
 
  const generateIndividualReport = async (id) => {
    setIsGeneratingReport(true);
    try {
      const response = await api.post('/Hackathon/generatereport', id);
      downloadCSV(response.data, `hackathon_${id}_report.csv`);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };
 
  const generateAllReports = async () => {
    setIsGeneratingReport(true);
    try {
      let allRows = [];
      for (let hackathon of hackathons) {
        const response = await api.post('/Hackathon/generatereport', hackathon.id);
        const rows = response.data.map(item => [
          hackathon.id,
          item.username,
          item.score,
          item.lastsubmission,
          item.dateRegistered,
          item.result
        ]);
        allRows.push(...rows);
      }
 
      const headers = ["Hackathon ID", "Username", "Score", "Last Submission", "Date Registered", "Result"];
      const csv = [headers, ...allRows].map(row => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `all_hackathons_report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating all reports:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  };
 
  const downloadCSV = (data, filename) => {
    const headers = ["Username", "Score", "Last Submission", "Date Registered", "Result"];
    const rows = data.map(item => [
      item.username,
      item.score,
      item.lastsubmission,
      item.dateRegistered,
      item.result
    ]);
 
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };
 
  return (
    <div className="admin-hackathon-page">
      {/* <div className="admin-hackathons-container"> */}
        <div className="hackathon-dashboard-header">
          <h2 style={{ fontWeight: 'bold' }}>🎓 Hackathon Management</h2>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
 
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
 
          <button
            className="generate-all-btn"
            onClick={generateAllReports}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? 'Generating...' : '📄 Generate All Reports'}
          </button>
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
                        onClick={() => generateIndividualReport(hackathon.id)}
                        disabled={isGeneratingReport}
                      >
                        📊 Individual Report
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteHackathon(hackathon.id)}
                      >
                        ❌ Delete
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
    //</div>
  );
};
 
export default AdminHackathons;