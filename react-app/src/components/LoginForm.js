import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // You'll need to install this package


const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState('');

  // Function to parse PDF text



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/User/login', {
        email: email,
        password: password
      });

      const user = response.data;
      console.log("user rrerer "+response+ user+" "+user.role);
      
      if (user.role =='Student') {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserRole('user');
        navigate('/dashboard');
      } else if (user.role =='Admin') {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserRole('admin');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid credentials');
      }
    }
    catch (err) {
      console.error(err);
      setError('Login Failed. Please check your credentials.'+ process.env.REACT_APP_API_BASE_UR);
    }
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('username', name);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('role', 'Student');
    formData.append('degree', '');
    formData.append('specialization', jobRole);
    formData.append('phoneNumber', '');
    formData.append('photoUrl', '');
    if (resumeFile) {
      formData.append('resumeText', resumeFile); // ✅ must match exactly with backend property
 // file input name must match server expectation
    }

    const response = await api.post('/User/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Registered Successfully!');
    setIsRegistering(false);
    setEmail('');
    setPassword('');
    setName('');
    setJobRole('');
    setResumeFile(null);
  } catch (err) {
    console.error(err);
    alert('Registration failed. Please try again.');
  }
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
      e.target.value = ''; // Reset the file input
    }
  };

  return (
    <div className="login-wrapper">
      <div className="animated-bg"></div>

      <div className="welcome-section">
        <h1>Welcome to Mavericks Coding Platform!</h1>
        {/* <h2>By Heaxaware</h> */}
        <p>{isRegistering ? "Join us by creating your account." : "Login to continue your journey 🚀"}</p>
      </div>

      <div className="login-section">
        <form className="login-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h2>{isRegistering ? "Register With Us" : "Sign In to MCP"}</h2>
          {error && !isRegistering && <p className="error">{error}</p>}

          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              >
                <option value="">Select Job Role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
              <div className="file-upload">
                <label htmlFor="resume-upload">Upload Resume (PDF):</label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                {isParsing && <p>Parsing resume...</p>}
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isParsing}>
            {isRegistering ? (isParsing ? "Processing..." : "Register") : "Submit"}
          </button>

          <div className="switch-link">
            {isRegistering ? (
              <p>Already have account? <span onClick={() => setIsRegistering(false)}>Login</span></p>
            ) : (
              <p>Don't have account? <span onClick={() => setIsRegistering(true)}>Register</span></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;