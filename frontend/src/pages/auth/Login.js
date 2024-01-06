import React, { //useContext, 
  useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
//import { setCurrentUserContext } from '../../App';
import {
  //useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

const Login = () => {
  const navigate = useNavigate();
  //const setCurrentUser = useContext(setCurrentUserContext)
  //const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
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
      console.log('Login erfolgreich')
      // Redirect to the homepage after login
      navigate('/');
    } catch (err) {
      setErrors(err.response?.data);
      // Set a timeout to clear errors after 5 seconds
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const togglePasword = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };
  
  const [errors, setErrors] = useState({});

  return (
  <main>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder='Username'
          autoComplete="username"
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
          autoComplete="current-password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="password-checkbox">
          <label htmlFor="checkbox">Show Password </label>
          <input id='checkbox' type='checkbox' onClick={togglePasword}/>
        </div>
        {errors.password?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>
          ))}
        {errors.non_field_errors?.map((message, idx) => (
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
          
    </div>
    </main>
  );
};

export default Login;