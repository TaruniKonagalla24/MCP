import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
const LoginForm = ({ setLoggedInUser }) => {
 const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const mockCredentials = {
   user: { username: 'user@hexaware.com', password: 'user123' },
   admin: { username: 'admin@hexaware.com', password: 'admin123' }
 };
 const handleSubmit = () => {
  if (username === 'user@hexaware.com' && password === 'user123') {
    setLoggedInUser({ username:'user@hexaware.com', role: 'user' });
    navigate('/dashboard');
  } else if (username === 'admin@hexaware.com' && password === 'admin123') {
    setLoggedInUser({ username:'admin@hexaware.com', role: 'admin' });
    navigate('/admin/dashboard');
  } else {
    alert('Invalid credentials');
  }
};
 return (
<div className="login-tab-container">
<div className="tabs">
<button
         className={activeTab === 'user' ? 'active' : ''}
         onClick={() => setActiveTab('user')}
>
         User Login
</button>
<button
         className={activeTab === 'admin' ? 'active' : ''}
         onClick={() => setActiveTab('admin')}
>
         Admin Login
</button>
</div>
<form onSubmit={handleSubmit} className="login-form">
<h2>{activeTab === 'admin' ? 'Admin Login' : 'User Login'}</h2>
<input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
       /><br />
<input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       /><br />
<button type="submit">Login</button>
</form>
</div>
 );
};
export default LoginForm;