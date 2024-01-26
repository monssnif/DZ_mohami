// HomePage.js
import React, { useState } from 'react';
import aboutUsImage from './logo.jpg'; // Remplacez le chemin par le chemin réel de votre image
import './HomePage.css';

const HomePage = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Check if at least one field is filled
    if (!first_name && !last_name && !speciality && !location) {
      alert('Remplissez au moins un champ!');;
      return;
    }
  
    console.log('Recherche effectuée avec les filtres :', { first_name, last_name, speciality, location });
  
    // Make a GET request with the new parameters
    // Use encodeURIComponent to handle special characters in the URL
    const queryString = `?first_name=${encodeURIComponent(first_name)}&last_name=${encodeURIComponent(last_name)}&speciality=${encodeURIComponent(speciality)}&location=${encodeURIComponent(location)}`;
  
    fetch(`http://127.0.0.1:8000/search${queryString}`)
      .then(response => response.json())
      .then(data => {
        // Handle the response data as needed
        console.log('Search results:', data);
  
        // Store the search results in local storage
        localStorage.setItem('searchResults', JSON.stringify(data));
  
        // Change browser location after the initial fetch promise is resolved
        window.location.href = 'http://127.0.0.1:8000/search/result_logged';
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="overlay">
          <h1>Bienvenue sur DZ-Mouhami</h1>
          <div className="recherche-page">
            <h2>trouver rapidement votre avocat</h2>
            <div className="search-filters">
              <input type="text" placeholder="Nom" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Prénom" value={last_name} onChange={(e) => setLastName(e.target.value)} />
              <input type="text" placeholder="Spécialité" value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
              <input type="text" placeholder="Emplacement" value={location} onChange={(e) => setLocation(e.target.value)} />
              <button onClick={handleSearch}>Rechercher</button>
            </div>
          </div>
        </div>
      </section>
      <section className="about-us-section">
        <h2>À propos de nous</h2>
        <div className="about-us-content">
          <div className="about-us-text">
            <p>
              DZ-Mouhami est bien plus qu'un simple annuaire d'avocats. Nous sommes votre partenaire
              dans la recherche de professionnels juridiques qualifiés en Algérie. Notre mission est de
              simplifier le processus de recherche et de vous fournir les informations nécessaires pour
              prendre des décisions éclairées concernant vos besoins juridiques.
            </p>
            <p>
              Notre équipe dévouée travaille sans relâche pour garantir la qualité des informations
              fournies et faciliter la connexion entre les avocats et ceux qui ont besoin de leurs services.
              Chez DZ-Mouhami, nous croyons en l'accès facile à la justice, et c'est ce que nous nous
              efforçons de réaliser chaque jour.
            </p>
          </div>
          <div className="about-us-image">
            <img src={aboutUsImage} alt="Qui sommes-nous ?" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;