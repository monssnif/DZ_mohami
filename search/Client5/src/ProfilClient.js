// ProfilClient.js
import React from 'react';
import './ProfilClient.css'; // Importez votre fichier CSS si nécessaire
import clientImage from './images/avocat5.jpg'; // Utilisez un chemin relatif correct

const ProfilClient = ({ client }) => {
  return (
    <div className="profil-client">
      <div className="details">
        <img src={`/avocats-images/avocat1.jpg`} alt={`Photo de ${avocat.nom}`} />
        <h2>{client.nom}</h2>
        <p className="commentaire">Commentaire : {client.commentaire}</p>
        <p className="note">Note : {client.note}</p>
      </div>

      <div className="evaluations">
        <h3>Évaluations et Commentaires</h3>
        <ul>
          {client.evaluations.map((evaluation, index) => (
            <li key={index}>
              <p>{evaluation.commentaire}</p>
              <p>Par {evaluation.auteur}, Note : {evaluation.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilClient;






