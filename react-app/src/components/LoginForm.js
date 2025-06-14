import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
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
 return (
<div className="login-container">
<form className="login-form" onSubmit={handleLogin}>
<h2>Login</h2>
       {error && <p className="error">{error}</p>}
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
<button type="submit">Login</button>
<div className="mock-details">
<p><strong>User:</strong> user@example.com / user123</p>
<p><strong>Admin:</strong> admin@example.com / admin123</p>
</div>
</form>
</div>
 );
};
export default LoginForm;