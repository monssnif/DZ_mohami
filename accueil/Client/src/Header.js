/* Dans votre composant où vous avez votre barre de navigation (Header.js, par exemple) */

import React from 'react';
import { FaBalanceScale } from 'react-icons/fa'; // Importez l'icône de la balance
import './Header.css';

const Header = () => {
  const handleConnexionClick1 = () => {

    window.location.href = 'http://127.0.0.1:8000/login/lawyer';
  };
  const handleConnexionClick2 = () => {

    window.location.href = 'http://127.0.0.1:8000/login/user';
  };
  return (
    <div className="header">
    <div className="logo">
      <span className="logo-text">
        <FaBalanceScale className="icon" />DZ-Mouhami
      </span>
    </div> 
    <div>
      <button className="connexionButton" onClick={handleConnexionClick2}>Connexion(Utilisateur)</button>
      <button className="connexionButton" onClick={handleConnexionClick1}>Connexion(Avocat)</button>
    </div>
  </div>
);
}

export default Header;

