import React from 'react';
import './Badges.css';
const Badges = ({ progress }) => {
 const earnedBadges = [];
 if (progress.exercisesCompleted >= 10) {
   earnedBadges.push({ name: 'Challenge Champ', icon: '🏅' });
 }
 if (progress.hackathonsJoined >= 3) {
   earnedBadges.push({ name: 'Hackathon Hero', icon: '🚀' });
 }
 if (progress.topRank) {
   earnedBadges.push({ name: 'Top Performer', icon: '📈' });
 }
 return (
<div className="badges-container">
<h3>Your Badges</h3>
<div className="badges-list">
       {earnedBadges.length ? (
         earnedBadges.map((badge, i) => (
<div key={i} className="badge">
<span className="icon">{badge.icon}</span>
<span className="label">{badge.name}</span>
</div>
         ))
       ) : (
<p>No badges yet. Keep going!</p>
       )}
</div>
</div>
 );
};
export default Badges;