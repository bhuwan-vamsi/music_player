import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Resetpassword() {
  const {token }=useParams();
  const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (userData) => {
    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        navigate('/login');
        // localStorage.setItem('email', userData.email);
      } else {
        alert('Password Change failed');
      }
    } catch (error) {
      console.error(error);
      alert('Please Check the link');
    }
  };
  
    const handleResetSubmit = (e) => {
      e.preventDefault();
      const userData = { password };
      handleResetPassword(userData);
    };

  return (
    <div className="body">
        <div className="form-container sign-in-container">
          <form onSubmit={handleResetSubmit}>
            <h1>ENTER PASSWORD</h1>
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="signIn">SUBMIT</button>
          </form>
        </div>
      </div>
  );
}

export default Resetpassword;
