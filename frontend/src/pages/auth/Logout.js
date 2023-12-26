import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useSetCurrentUser, } from '../../contexts/CurrentUserContext';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    //const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  
    useEffect(() => {
      const handleSignOut = async () => {
        try {
          await axios.post('/dj-rest-auth/logout/');
          setCurrentUser(null);
          console.log("Ausloggen");
          // Display the message for 10 seconds before redirecting
          await new Promise((resolve) => setTimeout(resolve, 10000));
        } catch (err) {
          console.log(err);
        } finally {
          localStorage.removeItem('authToken');
          // Redirect to the homepage after logout
          navigate('/');
        }
      };
  
      // Call the logout function
      handleSignOut();
    }, [navigate, setCurrentUser]);
  
    
  };
  
  export default Logout;