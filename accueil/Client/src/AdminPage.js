// AdminPage.js

import React, { useState } from 'react';

const AdminPage = () => {
  const [lawyers, setLawyers] = useState([
    { id: 1, name: 'Avocat 1', specialty: 'Droit civil', approved: true },
    { id: 2, name: 'Avocat 2', specialty: 'Droit pénal', approved: false },
    // ... d'autres avocats
  ]);

  const handleApproval = (id, isApproved) => {
    // Cette fonction doit être connectée à une base de données pour effectuer de vraies modifications
    setLawyers((prevLawyers) =>
      prevLawyers.map((lawyer) =>
        lawyer.id === id ? { ...lawyer, approved: isApproved } : lawyer
      )
    );
  };

  const handleDelete = (id) => {
    // Cette fonction doit être connectée à une base de données pour effectuer de vraies suppressions
    setLawyers((prevLawyers) => prevLawyers.filter((lawyer) => lawyer.id !== id));
  };

  return (
    <div>
      <h2>Page d'Administration</h2>
      <p>Réservée aux administrateurs du site.</p>

      <h3>Liste des avocats</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lawyers.map((lawyer) => (
            <tr key={lawyer.id}>
              <td>{lawyer.id}</td>
              <td>{lawyer.name}</td>
              <td>{lawyer.specialty}</td>
              <td>{lawyer.approved ? 'Approuvé' : 'En attente'}</td>
              <td>
                <button onClick={() => handleApproval(lawyer.id, !lawyer.approved)}>
                  {lawyer.approved ? 'Désapprouver' : 'Approuver'}
                </button>
                <button onClick={() => handleDelete(lawyer.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
