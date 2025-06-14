import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, Users, Settings, Archive } from 'lucide-react';
import './Sidebar.css';
function Sidebar() {
 return (
<div className="sidebar">
<h2>Mavericks Coding Platform</h2>
<ul>
<li><NavLink to="/dashboard"><Home /> Dashboard</NavLink></li>
<li><NavLink to="/hackathons"><Trophy /> Hackathons</NavLink></li>
<li><NavLink to="/teams"><Users /> Teams</NavLink></li>
<li><NavLink to="/settings"><Settings /> Settings</NavLink></li>
<li><NavLink to="/history"><Archive /> History</NavLink></li>
</ul>
</div>
 );
}
export default Sidebar;