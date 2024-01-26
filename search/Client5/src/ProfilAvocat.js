import React, { useState, useEffect } from 'react';
import './ProfilAvocat.css';

const ProfilAvocat = () => {
  const avocat = JSON.parse(localStorage.getItem('lawyerById')) || {};
  const [initialComments, setInitialComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
      setCsrfToken(csrfCookie.split('=')[1]);
    }
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setIsButtonDisabled(false);
  };

  const calculateAverageNote = () => {
    if (initialComments.length === 0) {
      return 0;
    }
    const totalNotes = initialComments.reduce((sum, comment) => sum + comment.note, 0);
    const averageNote = totalNotes / initialComments.length;
    return averageNote;
  };

  useEffect(() => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
      setCsrfToken(csrfCookie.split('=')[1]);
    }

    fetch(`http://127.0.0.1:8000/search/retrieve_comment/${avocat.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Comments:', data);
        localStorage.setItem('CommentById', JSON.stringify(data));
        setInitialComments(data || []);
        setComments(data);
      })
      .catch(error => console.error('Error fetching Comments:', error));
  }, [avocat.id]);

  const handleRendezVous = () => {
    window.location.href = 'http://127.0.0.1:8000/search/appointment';
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setIsButtonDisabled(e.target.value.trim() === '');
  };

  const handleCommentSubmit = () => {
    if (comment.trim() === '') {
      alert("Comment cannot be empty");
      return;
    }
    const advocateId = avocat.id;

    fetch('http://127.0.0.1:8000/search/add_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        advocate_id: advocateId,
        content: comment,
        note: rating,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Comment submission failed:', response.statusText);
          throw new Error('Comment submission failed');
        }
      })
      .then(data => {
        setComments(data);
        localStorage.setItem('CommentById', JSON.stringify(data));
        alert("Comment added successfully");
        setComment('');
        setIsButtonDisabled(true);
      })
      .catch(error => {
        console.error('Comment submission error:', error.message);
        if (error.message.includes('Unexpected token')) {
          window.location.href = 'http://127.0.0.1:8000/login/user';
        } else {
          alert("Failed to submit comment. Please try again.");
        }
      });
  };

    return (
      <div className="profil-avocat">
   <div className="details">
  <img src={avocat.image ? `http://127.0.0.1:8000${avocat.image}` : 'http://127.0.0.1:8000/media/images/th.jpg'} />
  <h2>{avocat.first_name} {avocat.last_name}</h2>
  <strong>Moyenne des notes: {calculateAverageNote()}</strong>
</div>

<div>
  <div className="speciality"> {/* Corrected className */}
    <h3>Spécialité:</h3>
    <p>{avocat.speciality}</p>
  </div>

  <div className="experiences">
    <h3>Expériences:</h3>
    <p>{avocat.description}</p>
  </div>

  <div className="adresse">
    <h3>Adresse</h3>
    <p>{avocat.location}</p>
  </div>
</div>

<div className="contact">
  <button onClick={handleRendezVous}>Prendre rendez-vous</button>
</div>
    <div className="commentaires">
    <h3>Évaluations et Commentaires</h3>
    <div className="rating-bar">
            <p>Votre évaluation:</p>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={index}
                onClick={() => handleRatingChange(star)}
                className={star <= rating ? 'filled' : 'empty'}
              >
                ★
              </span>
            ))}
          </div>
    <ul>
    {console.log(comments)}
    {comments.map((evaluation, index) => (
      <li key={index}>
        <strong>{evaluation.user_first_name} {evaluation.user_last_name}:</strong> {evaluation.content} &nbsp;&nbsp;&nbsp; <strong>note:{evaluation.note}</strong>
        
        {evaluation.respond !== '' && (
          <>
            <br />
            <strong>{evaluation.lawyer_first_name} {evaluation.lawyer_last_name}:</strong> {evaluation.respond}
          </>
        )}
      </li>
    ))}
  </ul>
      <textarea
        placeholder="Ajouter un commentaire..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <button onClick={handleCommentSubmit} disabled={isButtonDisabled}  style={{ backgroundColor: comment.trim() === '' ? 'lightgrey' :'#a68e06'}}>Ajouter un commentaire</button>
    </div>
  </div>
    );
  };

  export default ProfilAvocat;
