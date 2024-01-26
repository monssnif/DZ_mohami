
import React,{useState,useEffect} from 'react';
import { FaBalanceScale } from 'react-icons/fa'; 
import './Header.css';

const Header = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
   const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
        setCsrfToken(csrfCookie.split('=')[1]);
    }
}, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

  
    if (confirmLogout) {
      const token = sessionStorage.getItem('token');
      fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
          'X-CSRFToken': csrfToken,
        },
      })
        .then(response => {
          if (response.ok) {
           
            sessionStorage.removeItem('token');
           
            window.location.href = 'http://127.0.0.1:8000/';
          } else {
           
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

      <nav>
        <ul className="navlists">
          <li className="navItem">
            <a href="#" className="navLink">Accueil</a>
          </li>
        </ul>
      </nav>
      <button className="connexionButton" onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Header;

