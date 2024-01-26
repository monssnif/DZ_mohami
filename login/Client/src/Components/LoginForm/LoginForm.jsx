    import React, { useState,useEffect } from 'react';
    import './LoginForm.css';
    import { FaUser, FaLock } from "react-icons/fa";

    const LoginForm = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [csrfToken, setCsrfToken] = useState('');
    
        useEffect(() => {
            const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
            if (csrfCookie) {
                setCsrfToken(csrfCookie.split('=')[1]);
            }
        }, []);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('http://127.0.0.1:8000/login/lawyer_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    body: JSON.stringify({
                        identifier: email,
                        password: password,
                    }),
                });
    
                if (response.ok) {
                    // Handle successful login, e.g., redirect to another page
                    console.log('Login successful');
                    const data = await response.json();
                    console.log(data)
                    console.log(data.lawyer)
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('theLawyer',JSON.stringify(data.lawyer));
                    window.location.href = 'http://127.0.0.1:8000/avocat';
                } else {
                   
                    alert('Login failed');
                }
            } catch (error) {
               alert('Error during login:', error);
            }
        };
    
            return (
                <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <div className="input-box">
                        <input type="text" placeholder="  Adresse e-mail ou numéro de tél" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <FaUser className='icon' />

                    </div>              
                    <div className="input-box">
                        <input type="password" placeholder="   Mot de passe" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Se connecter</button>
                    <div className="register-link">
                        <p>Vous n'avez pas encore de compte? <a href="http://127.0.0.1:8000/register/lawyer">S'inscrire</a></p>
                    </div>
                </form>
                </div>

            );
    };
    export default LoginForm;