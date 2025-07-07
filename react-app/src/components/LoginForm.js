import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './LoginForm.css';

const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Quotes for floating background elements
const backgroundQuotes = [
  "// Code is like humor. When you have to explain it, it's bad.",
  "/* First, solve the problem. Then, write the code. */",
  "# Programming isn't about what you know; it's about what you can figure out.",
  "// The best error message is the one that never shows up.",
  "// Simplicity is the soul of efficiency.",
  "# Experience is the name everyone gives to their bugs.",
  "/* Good code is its own best documentation. */",
  "// Deleted code is debugged code.",
  "// Fix the cause, not the symptom.",
  "// Don't comment bad code—rewrite it."
];


  // Quotes for registration loading state
  const loadingQuotes = [
    "Building your developer profile...",
    "Compiling your awesomeness...",
    "Initializing your coding journey...",
    "Almost there! Finalizing setup...",
    "Good things take time... especially in coding!"
  ];
  const [currentQuote, setCurrentQuote] = useState(loadingQuotes[0]);

  // Programming language icons
  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript'];

  // Create stars for background
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.5
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    let interval;
    if (isLoading) {
      let quoteIndex = 0;
      setCurrentQuote(loadingQuotes[0]);
      interval = setInterval(() => {
        quoteIndex = (quoteIndex + 1) % loadingQuotes.length;
        setCurrentQuote(loadingQuotes[quoteIndex]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/User/login', {
        email: email,
        password: password
      });

      const user = response.data;
      
      if (user.role === 'Student') {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserRole('user');
        navigate('/dashboard');
      } else if (user.role === 'Admin') {
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
      setError('Login Failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
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
        formData.append('resumeText', resumeFile);
      }

      await api.post('/User/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Registration successful! Welcome to Mavericks Coding Platform.');
      setIsLoading(false);
      setIsRegistering(false);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setJobRole('');
    setResumeFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      setError('Please upload a PDF file');
      e.target.value = '';
    }
  };

  return (
    <div className="login-page-container">
      {/* Animated stars background */}
      <div className="login-stars-container">
        {stars.map(star => (
          <div 
            key={star.id}
            className="login-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.id * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Simple header with tagline */}
      <div className="login-header-container">
        <h1 className="login-hero-title">Mavericks Coding Platform</h1>
        <p className="login-tagline">Rise and Shine</p>
      </div>

      {/* Floating code elements */}
      <div className="login-code-background">
        {backgroundQuotes.map((quote, i) => (
          <div key={i} className="login-floating-quote" style={{
            left: `${Math.random() * 70 + 10}%`,
            top: `${Math.random() * 70 + 10}%`,
            animationDuration: `${Math.random() * 20 + 20}s`,
            animationDelay: `${Math.random() * 10}s`
          }}>
            {quote}
          </div>
        ))}

        {languages.map((lang, i) => (
          <div key={`lang-${i}`} className="login-floating-lang" style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animationDuration: `${Math.random() * 30 + 30}s`,
            animationDelay: `${i * 2}s`
          }}>
            {lang}
          </div>
        ))}
      </div>

      {/* Main login container moved to right */}
      <div className="login-right-container">
        <div className="login-main-box">
          <div className="login-form-header">
            <div className="login-logo">
              <span className="login-logo-bracket">{'</>'}</span>
              <h1>Mavericks<span className="login-logo-code"> Coding</span> Platform</h1>
            </div>
            <div className="login-auth-tabs">
              <button
                className={`login-tab ${!isRegistering ? 'login-active' : ''}`}
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                  setSuccessMessage('');
                }}
                disabled={isLoading}
              >
                Sign In
              </button>
              <button
                className={`login-tab ${isRegistering ? 'login-active' : ''}`}
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                  setSuccessMessage('');
                }}
                disabled={isLoading}
              >
                Register
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="login-loading-state">
              <div className="login-spinner"></div>
              <p className="login-loading-quote">{currentQuote}</p>
            </div>
          ) : successMessage ? (
            <div className="login-success-message">
              <svg className="login-success-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <p>{successMessage}</p>
              <button 
                className="login-back-to-login"
                onClick={() => {
                  setSuccessMessage('');
                  setIsRegistering(false);
                }}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form className="login-auth-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
              {error && <div className="login-error-message">{error}</div>}

              {isRegistering && (
                <>
                  <div className="login-input-group login-full-width">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="login-input-group login-full-width">
                    <label>Target Role</label>
                    <select
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select your target role</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Data Scientist">Data Scientist</option>
                    </select>
                  </div>

                  <div className="login-input-group login-full-width">
                    <label>Upload Resume (PDF)</label>
                    <div className="login-file-upload">
                      <label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          disabled={isLoading}
                        />
                        <span className="login-file-label">
                          {resumeFile ? resumeFile.name : "Choose file or drag here"}
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="login-input-group login-full-width">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="login-input-group login-full-width">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className="login-submit-btn login-full-width"
                disabled={isLoading}
              >
                {isRegistering ? "Create Account" : "Sign In"}
              </button>

              {!isLoading && (
                <div className="login-auth-footer">
                  {isRegistering ? (
                    <p>Already have an account? <span onClick={() => {
                      setIsRegistering(false);
                      setError('');
                    }}>Sign In</span></p>
                  ) : (
                    <p>Don't have an account? <span onClick={() => {
                      setIsRegistering(true);
                      setError('');
                    }}>Register</span></p>
                  )}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;