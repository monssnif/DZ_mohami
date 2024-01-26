import React, { useState, useEffect } from "react";
import './Registration.css';
import { FaUser, FaLock } from "react-icons/fa";

const Registration = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        speciality: '',
        location: '',
        password: '',
    });

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        if (csrfCookie) {
            setCsrfToken(csrfCookie.split('=')[1]);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/register/submit_lawyer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully');
                window.location.href = 'http://127.0.0.1:8000/';
            } else {
                alert('Failed to submit form');
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    return (
        <div className='wrapper'>
            <form action="" onSubmit={handleSubmit}>
                <h1>Inscription</h1>
                <div className="input-box">
                    <input type="text" placeholder="Prénom" name="first_name" value={formData.first_name} onChange={handleInputChange} required/>
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Nom" name="last_name" value={formData.last_name} onChange={handleInputChange} required/>
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="  Adresse émail " name="email" value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="  Numero de téléphone " name="phone_number" value={formData.phone} onChange={handleInputChange} required/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="  Domaines de spécialisation" name="speciality" value={formData.speciality} onChange={handleInputChange} required/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="  Location" name="location" value={formData.location} onChange={handleInputChange} required/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="  Mot de passe" name="password" value={formData.password} onChange={handleInputChange} required/>
                    <FaLock className='icon' />
                </div>
                

                <button type="submit">S'inscrire</button>
                <div className="register-link">
                    <p>Vous avez déjà un compte ? <a href="http://127.0.0.1:8000/login/lawyer">Connexion</a></p>
                </div>
            </form>
        </div>
    );
};

export default Registration;