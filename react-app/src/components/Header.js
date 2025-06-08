import React from 'react';
import './Header.css';
export default function Header({ page, setPage }) {
 return (
<header className="header">
<h1>Mavericks Coding Platform</h1>
<nav className="nav">
<button
         className={page === 'dashboard' ? 'btn active' : 'btn'}
         onClick={() => setPage('dashboard')}
>
         Dashboard
</button>
<button
         className={page === 'hackathon' ? 'btn active' : 'btn'}
         onClick={() => setPage('hackathon')}
>
         Hackathon
</button>
<button
         className={page === 'progress' ? 'btn active' : 'btn'}
         onClick={() => setPage('progress')}
>
         Progress
</button>
</nav>
</header>
 );
}