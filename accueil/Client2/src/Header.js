/* Dans votre composant où vous avez votre barre de navigation (Header.js, par exemple) */

import React, { useState,useEffect } from 'react';
import { FaBalanceScale } from 'react-icons/fa'; // Importez l'icône de la balance
import './Header.css';

const Header = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from cookie
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
        setCsrfToken(csrfCookie.split('=')[1]);
    }
}, []);

  const handleLogout = () => {
    // Ask for confirmation before logging out
    const confirmLogout = window.confirm("Are you sure you want to logout?");

  
    if (confirmLogout) {
      // Retrieve the JWT token from session storage
      const token = sessionStorage.getItem('token');
  
      // Send a request to the logout endpoint on your server
      fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
          'X-CSRFToken': csrfToken,
        },
        // You might want to include any necessary data or tokens in the request body
      })
        .then(response => {
          if (response.ok) {
            // Clear the JWT token from session storage upon successful logout
            sessionStorage.removeItem('token');
            // Optionally, redirect the user to a different page
            window.location.href = 'http://127.0.0.1:8000/';
          } else {
            // Handle errors, display a message, or perform other actions as needed
            console.error('Logout failed:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Logout error:', error.message);
        });
    }
  };
  return (
    <div className="header">
    <div className="logo">
      <span className="logo-text">
        <FaBalanceScale className="icon" />DZ-Mouhami
      </span>
    </div>

    <button className="connexionButton" onClick={handleLogout}>Se déconnecter</button>
  </div>
);
}

export default Header;

