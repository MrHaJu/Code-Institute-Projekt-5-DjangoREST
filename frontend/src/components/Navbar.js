import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { useState } from "react";
import Sidebar from "./sidebar";
import {
  faHome,
  faList,
  faCog,
  faUser,
  faSignIn,
  faSignOut,
  faSquarePlus,
  faHeart,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCurrentUserContext } from "../App";
import { currentUserContext } from "../App";

//import Avatar from "./Avatar";
export default function Navbar() {
  
  const setCurrentUser = useContext(setCurrentUserContext);
  const currentUser = useContext(currentUserContext);
  const logout = () => handleSignOut();
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  //Link array
  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: faCog,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }
  // Displays Icons only for logged out Users
  const loggedOutIcons = [
    {
      name: "Login",
      path: "/login",
      icon: faUser,
    },
    {
      name: "Sign up",
      path: "/register",
      icon: faSignIn,
    },
  ];
  // Displays Icons only for logged in Users
  const loggedInIcons = [
    { currentUser },
    {
      name: "Profile",
      path: "/Profile",
      icon: faUser,
    },
    {
      name: "Add Post",
      path: "/post/create",
      icon: faSquarePlus,
    },
    {
      name: "Liked",
      path: "/liked",
      icon: faHeart,
    },
    {
      name: "Bookmarked",
      path: "/bookmarked",
      icon: faBook,
    },
    {
      name: "Logout",
      onClick: logout,
      icon: faSignOut,
    },
  ];

  const handleSignOut = async () => {
    //console.log("Vor dem Logout:", currentUser);
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      // console.log("Nach dem Logout:", currentUser);
      console.log("Ausloggen erfolgreich");
    } catch (err) {
      console.log(err, "<===err");
    } finally {
      localStorage.removeItem("authToken");
      // Redirect to the homepage after logout
      navigate("/");
    }
  };

  return (
    <>
      <nav className="navbar container">
        <Link to="/" className="logo">
          Mr.HaJu's <span>Recipes</span> sharing
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.name}
            >
              <FontAwesomeIcon icon={link.icon} /> {link.name}
            </Link>
          ))}
          {currentUser
            ? // Links only for Logged in user
              loggedInIcons.map((link) => (
                <Link
                  className={location.pathname === link.path ? "active" : ""}
                  to={link.path}
                  key={link.name}
                  onClick={link.onClick}
                >
                  <FontAwesomeIcon icon={link.icon} /> {link.name}
                </Link>
              ))
            : // Links only for logged out user
              loggedOutIcons.map((link) => (
                <Link
                  className={location.pathname === link.path ? "active" : ""}
                  to={link.path}
                  key={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} /> {link.name}
                </Link>
              ))}
        </div>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      {showSidebar && (
        <Sidebar
          close={closeSidebar}
          links={links}
          loggedInIcons={loggedInIcons}
          loggedOutIcons={loggedOutIcons}
        />
      )}
    </>
  );
}
