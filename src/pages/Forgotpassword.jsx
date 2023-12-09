import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        navigate('/login');
        localStorage.setItem('email', userData.email);
      } else {
        alert('Email not found');
      }
    } catch (error) {
      console.error(error);
      alert('Fuck off');
    }
  };
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const userData = { email};
      handleLogin(userData);
    };

  return (
    <div className="body">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>ENTER EMAIL</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="signIn">SUBMIT</button>
          </form>
        </div>
      </div>
  );
}

export default Forgotpassword;
