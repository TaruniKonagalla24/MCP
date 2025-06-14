// components/ui/card.js
import React from 'react';
import './card.css';

export const Card = ({ children, className = '', onClick }) => (
  <div className={`custom-card ${className}`} onClick={onClick}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="custom-card-content">{children}</div>
);
