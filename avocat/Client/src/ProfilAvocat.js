import React, { useState,useEffect } from 'react';
import './ProfilAvocat.css';

const ProfilAvocat = ({ avocat}) => {
  const avocate = JSON.parse(sessionStorage.getItem('theLawyer')) || {};
  const [profileImage, setProfileImage] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [comments, setComments] = useState(avocat.evaluations || []);
  const token = sessionStorage.getItem('token')
  const [appointments, setAppointments] = useState([]);
  const [address,setAddress]=useState('');
  const [description ,setDescription]=useState('');
  const [speciality,setSpeciality]=useState('');
  

  useEffect(() => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
        setCsrfToken(csrfCookie.split('=')[1]);
    }
}, []);


useEffect(() => {
  const fetchAppointments = async () => {
    try {
      console.log('Fetching appointments with method GET');
      const response = await fetch(`http://127.0.0.1:8000/avocat/appointments/${avocate.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });
  
      const appointmentsData = await response.json();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  fetchAppointments();
}, [avocate.id, token]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/search/retrieve_comment/${avocate.id}`);
        const Comments = await response.json();
        console.log('Comments:', Comments);
        setComments(Comments);
        console.log(comments)
      } catch (error) {
        console.error('Error fetching Comments:', error);
      }
    };

    fetchComments();
  }, [avocate.id]);

  const handleReplyChange = (index, e) => {
    const updatedComments = [...comments];
    updatedComments[index].reponse = e.target.value;
    setComments(updatedComments);
  };

  const handleReplySubmit = async (index) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/avocat/add_reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          commentId: comments[index].id, 
          reply: comments[index].reponse,
        }),
      });
  
      if (response.ok) {
        alert('Submitted successfuly');
      } else {
        alert('Error submitting reply:', response.statusText);
      }
    } catch (error) {
      alert('Error submitting reply:', error);
    }
  };
  const handleAcceptAppointment = async (index, appointmentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/avocat/appointments/${appointmentId}/accept/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        alert('Accespted successfuly');
        const updatedAppointments = [...appointments];
        updatedAppointments.splice(index, 1);
        setAppointments(updatedAppointments);
      } else {
        alert('Error accepting appointment:', response.statusText);
      }
    } catch (error) {
      alert('Error accepting appointment:', error);
    }
  };

  const handleRejectAppointment = async (index, appointmentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/avocat/appointments/${appointmentId}/reject/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        alert('Rejected successfuly');
        const updatedAppointments = [...appointments];
        updatedAppointments.splice(index, 1);
        setAppointments(updatedAppointments);
      } else {
        alert('Error rejecting appointment:', response.statusText);
      }
    } catch (error) {
      alert('Error rejecting appointment:', error);
    }
  };
  
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };


  const handleUpdateLocation = async () => {
    if (!address.trim()) {
        alert('Cannot be empty');
        return;
    }
    avocate.location=address
    sessionStorage.setItem('theLawyer',JSON.stringify(avocate))

    try {
        const response = await fetch(`http://127.0.0.1:8000/avocat/update_location/${avocate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                location: address,
            }),
        });

        if (response.ok) {
          alert('Updated successfuly');
            
        } else {
            alert('Error updating location:', response.statusText);
        }
    } catch (error) {
        alert('Error updating location:', error);
    }
};


const handleUpdateDescription = async () => {
  if (!description.trim()) {
      alert('Cannot be empty');
      return;
  }
  avocate.description=description
  sessionStorage.setItem('theLawyer',JSON.stringify(avocate))

  try {
      const response = await fetch(`http://127.0.0.1:8000/avocat/update_description/${avocate.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({
              description: description,
          }),
      });

      if (response.ok) {
        alert('Updated successfuly');
      } else {
          alert('Error updating :', response.statusText);
      }
  } catch (error) {
      alert('Error updating :', error);
  }
};


const handleUpdateSpeciality = async () => {
  if (!speciality.trim()) {
      alert('Cannot be empty');
      return;
  }
  avocate.speciality=speciality
  sessionStorage.setItem('theLawyer',JSON.stringify(avocate))

  try {
      const response = await fetch(`http://127.0.0.1:8000/avocat/update_speciality/${avocate.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({
              speciality: speciality,
          }),
      });

      if (response.ok) {
        alert('Updated successfuly');
      } else {
          alert('Error updating :', response.statusText);
      }
  } catch (error) {
      alert('Error updating :', error);
  }
};
const handleImageChange = (e) => {
  const selectedImage = e.target.files[0];
  setProfileImage(selectedImage);
};
const handleUploadImage = async () => {
  try {
    const formData = new FormData();
    formData.append('image', profileImage); // 

    const response = await fetch(`http://127.0.0.1:8000/avocat/update_image/${avocate.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      },
      body: formData,
    });

    if (response.ok) {
      alert('Updated successfuly');
      const responseData = await response.json();
      const imageUrl = responseData.image;
      avocate.image=imageUrl
      sessionStorage.setItem('theLawyer',JSON.stringify(avocate))

    } else {
      alert('Error uploading image:', response.statusText);
    }
  } catch (error) {
   alert('Error uploading image:', error);
  }
};
console.log(`http://127.0.0.1:8000/media/${avocate.image}`)
  return (
    <div className="profil-avocat">
    <div className="details">
      <img src={avocate.image ? `http://127.0.0.1:8000${avocate.image}` : 'http://127.0.0.1:8000/media/images/th.jpg'} />
      <div className="contact">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUploadImage}>Changer Photo de Profil</button>
      </div>
      <h2>{avocate.first_name} {avocate.last_name}</h2>
      <h3>Spécialité:</h3>
      {avocate.speciality}
      <div className="contact">
        <textarea
          placeholder="Modifier spécialité"
          value={speciality}
          onChange={(e) => handleSpecialityChange(e)}
          className="wide-text-area"
        ></textarea>
        <button onClick={handleUpdateSpeciality}>Modifier</button>
      </div>
    </div>

    <div className="experiences">
      <h3 style={{ textAlign: 'center' }}>Expériences:</h3>
      <ul>
        {avocate.description}
      </ul>
      <div className="contact">
        <textarea
          placeholder="Modifier les expériences"
          value={description}
          onChange={(e) => handleDescriptionChange(e)}
          className="wide-text-area" 
        ></textarea>
        <button onClick={handleUpdateDescription}>Modifier</button>
      </div>
    </div>

    <div className="adresse">
      <h3>Adresse:</h3>
      <p>{avocate.location}</p>
    </div>

    <div className="contact">
      <textarea
        placeholder="Modifier l'adresse"
        value={address}
        onChange={(e) => handleAddressChange(e)}
        className="wide-text-area" 
      ></textarea>
      <button onClick={handleUpdateLocation}>Modifier</button>
    </div>
    <div className="rendez-vous">
  <h3>Rendez-vous réservés</h3>
  {appointments.length > 0 ? (
    <ul>
      {appointments.map((appointment, index) => (
        <li key={index}>
          <strong>{appointment.user_first_name} {appointment.user_last_name}</strong> a réservé un rendez-vous le {appointment.day} sur : {appointment.time}
          <button onClick={() => handleAcceptAppointment(index, appointment.id)}>Accepter</button>
          <button onClick={() => handleRejectAppointment(index, appointment.id)}>Refuser</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>Aucun rendez-vous réservé</p>
  )}
</div>



  
      <div className="commentaires">
        <h3>Évaluations et Commentaires</h3>
        <ul>
          {comments.map((evaluation, index) => (
            <li key={index}>
              <strong>{evaluation.user_first_name} {evaluation.user_last_name}:</strong> {evaluation.content}
               {evaluation.note && <>&nbsp;&nbsp;&nbsp; <strong>note: {evaluation.note}</strong></>}
               {evaluation.respond && evaluation.respond.trim() !== '' && (
  <>
    <br />
    <strong>{evaluation.lawyer_first_name} {evaluation.lawyer_last_name}:</strong> {evaluation.respond}
  </>
)}
              <textarea
                placeholder="Répondre au commentaire..."
                value={evaluation.reponse}
                onChange={(e) => handleReplyChange(index, e)}
              ></textarea>
              <button onClick={() => handleReplySubmit(index) }  >Répondre</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilAvocat;