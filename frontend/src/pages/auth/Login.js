import React, { useContext, useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUserContext } from '../../App';

const Login = () => {
  const setCurrentUser = useContext(setCurrentUserContext)
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  
  const { username, password } = signInData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const history = useNavigate();
  
  const [errors, setErrors] = useState({});

  return (
  <main>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username or E-Mail:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder='Username'
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          autocomplete="current-password"
          value={password}
          onChange={handleChange}
          required
        />
        {errors.password?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}

        <button className="btn" type="submit">Login</button>
      </form>
    </div>
    <div className='login-container signin'>
      <p>Don't have an account?</p>
    <Link className="btn" to="/register">
            Sign up now!
          </Link>
          {errors.non_field_errors?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
    </div>
    </main>
  );
};

export default Login;