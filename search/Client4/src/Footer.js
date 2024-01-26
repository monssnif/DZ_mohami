import React from 'react';
import { FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="foot">
        <div className="row">
          <div className="col d-flex">
            <h3>Contact</h3>
            <br></br>
            <p>
              <i className='bx bxs-phone'></i> +213 541279802
            </p>
          <p>Contactez-nous : contact@dz-mouhami.com</p>
          <p>&copy; 2023 DZ-Mouhami. Tous droits réservés.</p>

          </div>

          <div className="col d-flex">
            <h3>Liens Utiles</h3>
            <br />
            <a href="">Accueil</a>
            <br />
            <a href="">À propos de nous</a>
          </div>
          <div className="opinion">
          <h3>Rappel des Services</h3>
          <p>
            Bienvenue sur notre site web! Nous sommes là pour vous fournir les meilleures informations
            et services juridiques.
          </p>
        </div>
        </div>
        <br />
        <br />
        <div className="icon-wrapper">
          <ul className="icon-list">
            <li>
              <a href="">
                <FaEnvelope />
              </a>
            </li>
            <li>
              <a href="">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="">
                <FaFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


