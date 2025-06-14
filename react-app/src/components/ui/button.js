// components/ui/button.js
import React from 'react';
import './button.css';

export const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
