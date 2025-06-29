import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaRocket, FaAlignLeft ,FaCalendarAlt, FaCode, FaTrophy, FaClock, FaStar, FaTags, FaLightbulb } from 'react-icons/fa';
import './AdminCreateHackathon.css';

const AdminCreateHackathon = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Initial input, 2: Edit details
  const [input, setInput] = useState('');
  const [hackathonData, setHackathonData] = useState(null);
  const [formData, setFormData] = useState({
    problem: '',
    testCases: '',
    startTime: '',
    endTime: '',
    createdBy: 'admin',
    badges: '',
    difficulty: 'Medium',
    skill: '',
    description: '',
    hints: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/Hackathon/createHackathon', input);
      setHackathonData(response.data);
      
      // Pre-fill form with API response
      setFormData({
        problem: response.data.title || '',
        testCases: JSON.stringify(response.data.testCases) || '',
        createdBy: 'admin',
        badges: response.data.badge?.name || '',
        difficulty: 'Medium',
        skill: response.data.skills?.join(', ') || '',
        description: response.data.description || '',
        hints: response.data.hints?.join('\n') || ''
      });
      
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create hackathon');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        startTime: formData.startTime || new Date().toISOString(),
        endTime: formData.endTime || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      await api.post('/Hackathon/createnewhackathon', payload);
      navigate('/admin/hackathons');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hackathon');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-create-hackathon">
      <div className="create-hackathon-container">
       <div className="create-width"><h2>
  <FaRocket style={{ marginRight: '10px', color: '#4299e1' }} />
  Create New Hackathon Challenge
</h2></div>
        
        {error && <div className="error-message">{error}</div>}
        
        {step === 1 ? (
          <form onSubmit={handleInitialSubmit} className="initial-form">
            <div className="form-group">
              <label htmlFor="hackathonInput">Enter Hackathon Challenge Idea</label>
              <textarea
                id="hackathonInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 'Find the longest palindromic substring in a string'"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Challenge'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalSubmit} className="details-form">
            <div className="form-row">
              <div className="form-group">
                <label><FaCode style={{ marginRight: '10px', color: '#1abc9c' }} />Problem Title</label>
                <input
                  type="text"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><FaTags style={{ marginRight: '10px', color: '#ffa500' }} />Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label><FaAlignLeft style={{ marginRight: '10px', color: '#3498db' }} />Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label><FaClock style={{ marginRight: '10px', color: '#00b894'  }} />Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label><FaCalendarAlt style={{ marginRight: '10px', color: '#6c5ce7' }} />End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label><FaTrophy style={{ marginRight: '10px', color: '#e74c3c' }} />Badge Name</label>
                <input
                  type="text"
                  name="badges"
                  value={formData.badges}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><FaStar style={{ marginRight: '10px', color: '#2980b9' }} />Skills (comma separated)</label>
                <input
                  type="text"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label><FaLightbulb style={{ marginRight: '10px', color: '#34495e' }} />Test Cases (JSON)</label>
              <textarea
                name="testCases"
                value={formData.testCases}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label><FaLightbulb style={{ marginRight: '10px', color: '#f1c40f' }} />Hints (one per line)</label>
              <textarea
                name="hints"
                value={formData.hints}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setStep(1)} className="secondary">
                Back
              </button>
              <button type="submit"  disabled={loading}>
                {loading ? 'Saving...' : 'Create Hackathon'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminCreateHackathon;