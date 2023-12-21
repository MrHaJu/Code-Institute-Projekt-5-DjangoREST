import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import axios from 'axios';
import { currentUserContext } from '../../App';


const Logout = () => {
    const navigate = useNavigate();
    const setCurrentUser = useSetCurrentUser(currentUserContext);
  
    useEffect(() => {
      const handleSignOut = async () => {
        try {
          await axios.post('/dj-rest-auth/logout/');
          setCurrentUser(null);
          // Display the message for 3 seconds before redirecting
          await new Promise((resolve) => setTimeout(resolve, 6000));
        } catch (err) {
          console.log(err);
        } finally {
          // Redirect to the homepage after logout
          navigate('/');
        }
      };
  
      // Call the logout function
      handleSignOut();
    }, [navigate, setCurrentUser]);
  
    return (
      <div>
        <h2>Logout</h2>
        <p>You have been successfully logged out.</p>
        {/* You can add additional content or styling as needed */}
      </div>
    );
  };
  
  export default Logout;