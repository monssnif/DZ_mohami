import './App.css';
import './appi.css';
import React, { useState, useEffect } from 'react';

const AppointmentForm = () => {
  const avocat = JSON.parse(localStorage.getItem('lawyerById')) || {};
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [takenAppointments, setTakenAppointments] = useState([]);
  const token = sessionStorage.getItem('token');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
      setCsrfToken(csrfCookie.split('=')[1]);
    }
  }, []);

  useEffect(() => {
    const fetchTakenAppointments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/search/taken_appointments?lawyer_id=${avocat.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': csrfToken,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setTakenAppointments(data);
          console.log(takenAppointments)
        } else {
          console.error('Fetching taken appointments failed:', response.statusText);
        }
      } catch (error) {
        console.error('Fetching taken appointments error:', error.message);
      }
    };
  
    fetchTakenAppointments();
  }, [avocat.id, token, csrfToken]);


  const generateTimeOptions = () => {
    const hours = Array.from({ length: 16 }, (_, index) => index + 7);
    return hours.map((hour) => (
      <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
    ));
  };

  const generateDayOptions = () => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    return days.map((day) => (
      <option key={day} value={day}>{day}</option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTime || !selectedDay) {
      alert('Veuillez choisir une heure et un jour avant de soumettre le formulaire.');
      return;
    }

    const advocateId = avocat.id;

    const requestData = {
      advocate_id: advocateId,
      time: selectedTime,
      day: selectedDay,
    };

    fetch('http://127.0.0.1:8000/search/create_appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Form submission failed:', response.statusText);
          throw new Error('Form submission failed');
        }
      })
      .then(data => {
        alert('Form submitted successfully:', data);

        setSelectedTime('');
        setSelectedDay('');

        alert('Rendez-vous pris avec succès!');
        window.location.href='http://127.0.0.1:8000/search/profile_logged'
      })
      .catch(error => {
        if (error.message.includes('Unexpected token')) {
          
          window.location.href = 'http://127.0.0.1:8000/login/user';
        }else{
          alert('Form submission error: You already have an appointment or someone reserved that time');
        window.location.href='http://127.0.0.1:8000/search/profile';}
      });
  };

  return (
    <div className="appointment-container">
      <div className="form-container">
        <h2>Choisissez l'heure et le jour qui vous conviennent</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Heure choisie:
            <select
              name="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            >
              <option value="" disabled>Selectionnez</option>
              {generateTimeOptions()}
            </select>
          </label>
          <label>
            Jour choisi:
            <select
              name="day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="" disabled>Selectionnez</option>
              {generateDayOptions()}
            </select>
          </label>
          <button type="submit">Prendre rendez-vous</button>
        </form>
         <div className="taken-appointments">
          <h3>Dates et heures prises:</h3>
          <ul>
            {takenAppointments.map((appointment, index) => (
              <li key={index}>{`${appointment.day} à ${appointment.time}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;