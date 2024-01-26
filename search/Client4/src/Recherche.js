import React, { useState, useEffect } from 'react';
import './Recherche.css';

const ListeAvocats = () => {
  const avocats = JSON.parse(localStorage.getItem('searchResults')) || [];


  const handleViewMore = (avocatId) => {
    fetch(`http://127.0.0.1:8000/search/retrieve_comment/${avocatId}`)  
    .then(response => response.json())
      .then(Comments => {
        console.log('Comments:', Comments);
        localStorage.setItem('CommentById', JSON.stringify(Comments));
      })
      .catch(error => console.error('Error fetching Comments:', error));



    fetch(`http://127.0.0.1:8000/search/lawyer_profile/${avocatId}`)  
    .then(response => response.json())
      .then(avocatDetails => {
        console.log('Avocat details:', avocatDetails);
        localStorage.setItem('lawyerById', JSON.stringify(avocatDetails));
        window.location.href = 'http://127.0.0.1:8000/search/profile_logged';
      })
      .catch(error => console.error('Error fetching avocat details:', error));
  };

  if (avocats.length === 0) {
    return (
      <div className="liste-avocats">
        <h1>Il n y'a aucune résultat</h1>
      </div>
    );
  }
else{
  return (
    <div className="liste-avocats">
    <h2>Tous les Avocats</h2>
    <div className="avocat-cards">
      {avocats.map(avocat => (
        <div key={avocat.id} className="avocat-card">
          <img src={avocat.image ? `http://127.0.0.1:8000${avocat.image}` : 'http://127.0.0.1:8000/media/images/th.jpg'} />
          <h3>{avocat.first_name} {avocat.last_name}</h3>
          <p>Adresse: {avocat.location}</p>
          <p>Expérience: {avocat.description}</p>
          <p>Spécialité: {avocat.speciality}</p>
          <button onClick={() => handleViewMore(avocat.id)}>Voir plus</button>
        </div>
      ))}
    </div>
  </div>
  );
};};

export default ListeAvocats;