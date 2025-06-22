import React, { useState, useEffect } from 'react';
import './Settings.css';
import api from '../api/axios'; 
import { FaLinkedin, FaGithub, FaSave, FaUser, FaGraduationCap, FaCode } from 'react-icons/fa';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    degree: '',
    specialization: '',
    phoneNumber: '',
    skills: '',
    experience: '',
    programmingLanguagesKnown: ''
  });

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) throw new Error('User not found in local storage');
        
        setUser(userData);
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          role: userData.role || '',
          degree: userData.degree || '',
          specialization: userData.specialization || '',
          phoneNumber: userData.phoneNumber || '',
          skills: userData.skills || '',
          experience: userData.experience || '',
          programmingLanguagesKnown: userData.programmingLanguagesKnown || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post(
        '/User/Upadateprofile',
        {
          id: user.id.toString(),
          ...formData
        },
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          }
        }
      );

      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError('Failed to update profile. Please check the form data.');
    }
  };

  if (loading) return <div className="settings-container">Loading user data...</div>;
  if (!user) return <div className="settings-container">User not found</div>;

  return (
    <div className="settings-container">
      <h2>User Settings</h2>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-grid">
          {/* Basic Info */}
          <div className="settings-section">
            <div className="section-header">
              <FaUser className="section-icon" />
              <h3>Basic Information</h3>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          {/* Education */}
          <div className="settings-section">
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3>Education</h3>
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input type="text" name="degree" value={formData.degree} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Specialization</label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
            </div>
          </div>

          {/* Skills */}
          <div className="settings-section">
            <div className="section-header">
              <FaCode className="section-icon" />
              <h3>Skills & Experience</h3>
            </div>
            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, Python, React"
              />
            </div>
            <div className="form-group">
              <label>Programming Languages</label>
              <input
                type="text"
                name="programmingLanguagesKnown"
                value={formData.programmingLanguagesKnown}
                onChange={handleChange}
                placeholder="e.g., C#, Java, Python"
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <select name="experience" value={formData.experience} onChange={handleChange}>
                <option value="">Select Experience</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
          </div>

          {/* Social Links */}
          <div className="settings-section">
            <div className="section-header">
              <FaUser className="section-icon" />
              <h3>Social Links</h3>
            </div>
            <div className="form-group">
              <label><FaLinkedin /> LinkedIn Profile</label>
              <input type="url" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
            <div className="form-group">
              <label><FaGithub /> GitHub Profile</label>
              <input type="url" placeholder="https://github.com/yourusername" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
