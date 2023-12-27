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
        history.push('/signin')
      } catch(err){
        console.log(err)
        setErrors(err.response?.data);
      }
    }

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
          <label htmlFor="password">Password:</label>
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
