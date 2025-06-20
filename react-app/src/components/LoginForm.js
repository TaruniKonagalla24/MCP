import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'user123') {
      setIsLoggedIn(true);
      setUserRole('user');
      navigate('/dashboard');
    } else if (email === 'admin@example.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setUserRole('admin');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registered Successfully!\nName: ${name}\nEmail: ${email}\nRole: ${jobRole}`);
    setIsRegistering(false);
    setEmail('');
    setPassword('');
    setName('');
    setJobRole('');
  };

  return (
    <div className="login-wrapper">
      <div className="animated-bg"></div>

      <div className="welcome-section">
        <h1>Welcome!</h1>
        <p>{isRegistering ? "Join us by creating your account." : "Login to continue your journey 🚀"}</p>
      </div>

      <div className="login-section">
        <form className="login-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h2>{isRegistering ? "Register" : "Sign In"}</h2>
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
            </>
          )}

          <input
            type="email"
            placeholder="User Name"
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
          <button type="submit">{isRegistering ? "Register" : "Submit"}</button>

          <div className="switch-link">
            {isRegistering ? (
              <p>Already have account? <span onClick={() => setIsRegistering(false)}>Login</span></p>
            ) : (
              <p>Don’t have account? <span onClick={() => setIsRegistering(true)}>Register</span></p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;
