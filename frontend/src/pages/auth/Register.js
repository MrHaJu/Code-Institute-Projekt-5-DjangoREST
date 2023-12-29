import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


  const Register = () => {
    const [signUpData, setSignUpData] = useState ({
      username: '',
      email: '',
      password1: '',
      password2: ''
    })
    const { username, email, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});
    const history = useNavigate();
    
    const  handleChange = (event) => {
      setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    })
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post('/dj-rest-auth/registration/', signUpData)
        history('/login')
        console.log('Registrierung erfolgreich')
      } catch(err){
        console.log(err)
        setErrors(err.response?.data);
      }
    }
    const togglePassword = () => {
      const passwordInput1 = document.getElementById("password1");
      const passwordInput2 = document.getElementById("password2");
    
      if (passwordInput1 && passwordInput2) {
        // Toggle visibility for password1
        if (passwordInput1.type === "password") {
          passwordInput1.type = "text";
        } else {
          passwordInput1.type = "password";
        }
    
        // Toggle visibility for password2
        if (passwordInput2.type === "password") {
          passwordInput2.type = "text";
        } else {
          passwordInput2.type = "password";
        }
      }
    };
  return (
    <main>
      <div className="register-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            autocomplete="username"
            value={username}
            onChange={handleChange}
            required
          />
          {errors.username?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail"
            autocomplete="email"
            value={email}
            onChange={handleChange}
            required
          />
          {errors.email?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            name="password1"
            placeholder="Password"
            autocomplete="current-password"
            value={password1}
            onChange={handleChange}
            required
          />
          
          {errors.password?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={handleChange}
            required
          />
          <div className="password-checkbox">
          <label htmlFor="checkbox">Show Password </label>
          <input id="checkbox" type="checkbox" onClick={togglePassword} />
          </div>
          {errors.confirmPassword?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
          <button className="btn" type="submit">
            Sign up
          </button>
        </form>
        
      </div><br></br>
      <div className="register-container signup">
        <p>Already have an account? </p>
        <Link to="/login" className="btn">Log in</Link>
        {errors.non_field_errors?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
      </div>
    </main>
  );
};

export default Register;
