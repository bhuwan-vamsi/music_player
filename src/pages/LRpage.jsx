import React, { useState } from "react";
import "../css/LRpage.css";
import { useNavigate } from "react-router-dom";

function LRpage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('User registered successfully');
        localStorage.setItem('email', userData.email);
        navigate('/home');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        navigate('/home');
        localStorage.setItem('email', userData.email);
      } else {
        alert('Signin failed');
      }
    } catch (error) {
      console.error(error);
      alert('Sign-in failed');
    }
  };

  const [isRightPanelActive, setRightPanelActive] = useState(false);
    function handleSignUp() {
        setRightPanelActive(true);
    }
    function handleSignIn() {
        setRightPanelActive(false);
    }

    const handleRegisterSubmit = (e) => {
      e.preventDefault();
      const userData = { name, email, password };
      handleRegister(userData);
    };
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const userData = { email, password };
      handleLogin(userData);
    };

  return (
    <div className="body">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="signUp">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forgot your password?</a>
            <button type="submit" className="signIn">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LRpage;
