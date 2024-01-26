import React, { useState } from 'react';
import ProfilAvocat from './ProfilAvocat';
import './App.css';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  const [avocatData, setAvocatData] = useState({
    nom: "Maître Jean Dupont",
    specialite: "Droit de la famille",
    coordonnees: "123 Rue de l'Avocat, Ville",
    photo: './avocats-images/avocat1.jpg',
    competences: ['Plaidoyer', 'Conseil juridique'],
    experiences: ['Envision Family Law2019 - Present', 'Law Office of Andrew May2011 - 2019', 'Law Offices Of Felicia A. Malsby, PS2009 - 2011'],
    domainesPratique: ['Divorce', 'Garde d\'enfants'],
    adresse: "123 Rue de l'Avocat, Ville",
    evaluations: [
      { auteur: 'Mohamed Ourari', photo: './avocats-images/avocat1.jpg', commentaire: 'Excellent help with my divorce...', note: 5 },
      { auteur: 'Cylia Bouhafes', photo: './avocats-images/client2.jpg', commentaire: 'Bon avocat Il y a quelques années...', note: 4.5 },
    ],
    contactRequests: [],
    appointments: [
      { client: 'Client1: ', date: '2023-12-14' },
      { client: 'Client2: ', date: '2023-15-14' },
    ],
  });

  const handleAcceptRequest = (index) => {
    const updatedRequests = [...avocatData.contactRequests];
    const acceptedRequest = updatedRequests.splice(index, 1)[0];
    setAvocatData({
      ...avocatData,
      contactRequests: updatedRequests,
    });
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = [...avocatData.contactRequests];
    updatedRequests.splice(index, 1);
    setAvocatData({
      ...avocatData,
      contactRequests: updatedRequests,
    });
  };

  const handleAcceptAppointment = (index) => {
    const updatedAppointments = [...avocatData.appointments];
    const acceptedAppointment = updatedAppointments.splice(index, 1)[0];
    setAvocatData({
      ...avocatData,
      appointments: updatedAppointments,
    });
  };

  const handleRejectAppointment = (index) => {
    const updatedAppointments = [...avocatData.appointments];
    updatedAppointments.splice(index, 1);
    setAvocatData({
      ...avocatData,
      appointments: updatedAppointments,
    });
  };

  return (
    <div>
      <Header />
      <ProfilAvocat
        avocat={avocatData}
        handleAcceptRequest={handleAcceptRequest}
        handleRejectRequest={handleRejectRequest}
        handleAcceptAppointment={handleAcceptAppointment}
        handleRejectAppointment={handleRejectAppointment}
      />
      <Footer />
    </div>
  );
};

export default App;