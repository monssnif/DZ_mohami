import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { first_name: "", last_name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
      setCsrfToken(csrfCookie.split('=')[1]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://127.0.0.1:8000/register/submit_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); 

        window.location.href = 'http://127.0.0.1:8000/'
      } catch (error) {
        alert('Error during form submission:', error.message);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.first_name) {
      errors.first_name = "Prénom is required!";
    }
    if (!values.last_name) {
      errors.last_name = "Nom is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Mot de pass is required";
    } else if (values.password.length < 4) {
      errors.password = "Mot de pass must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Mot de pass cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Inscription d'utilisateur</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Prénom</label>
            <input
              type="text"
              name="first_name"
              placeholder="Prénom"
              value={formValues.first_name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.first_name}</p>
          <div className="field">
            <label>Nom</label>
            <input
              type="text"
              name="last_name"
              placeholder="Nom"
              value={formValues.last_name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.last_name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Mot de pass</label>
            <input
              type="password"
              name="password"
              placeholder="Mot de pass"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
          <p>Vous avez deja un compte? <a href="http://127.0.0.1:8000/login/user">Connexion</a></p>
        </div>
      </form>
    </div>
  );
}

export default App;