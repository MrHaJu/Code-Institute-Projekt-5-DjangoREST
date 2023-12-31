import { Link, useLocation } from "react-router-dom";
import React

from "react";
import { useState } from "react";
import Avatar from "./Avatar";
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

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { Row } from "react-bootstrap";
import { removeTokenTimestamp } from "../utils/utils";

export default function Navbar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  
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
      id: 0,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
      id: 1,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: faCog,
      id: 2,
    },
  ];

  
  // Displays Icons only for logged out Users
  const loggedOutIcons = [
    {
      name: "Login",
      path: "/login",
      icon: faUser,
      id: 3,
    },
    {
      name: "Sign up",
      path: "/register",
      icon: faSignIn,
      id: 4,
    },
  ];
  // Displays Icons only for logged in Users
  const loggedInIcons = [
    {
      name: "Add Recipe",
      path: "/post/create",
      icon: faSquarePlus,
      id: 5,
    },
    {
      name: "Liked",
      path: "/liked",
      icon: faHeart,
      id: 6,
    },
    {
      name: "Bookmarked",
      path: "/bookmarked-posts",
      icon: faBook,
      id: 7,
    },
    {
      name: "Logout",
      onClick: logout,
      icon: faSignOut,
      id: 8,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }
  const handleSignOut = async () => {

    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      //console.log(err, "<===err");
    } finally {
      // Redirect to the homepage after logout
      navigate("/");
    }
  };

  return (
    <>
      <nav className="navbar container">
        <Link to="/" key="9" id="9" className="logo">
          Mr.HaJu's <span>Recipes</span> sharing
        </Link>
        {currentUser && (
        <Link
          className="nav-links Text-center row" key="profile" id="profile"
          to={`/profiles/${currentUser.profile_id}`}
        >
          <Row>
            <Avatar className="" src={currentUser.profile_image} height={40} />
          </Row>
          <Row>
            <p className="NavProftext">Profile</p>
          </Row>
        </Link>
        )}
        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.id}
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
                  key={link.id}
                  onClick={(event) => { event.stopPropagation(); link.onClick(); }}
                >
                  <FontAwesomeIcon icon={link.icon} /> {link.name}
                </Link>
              ))
            : // Links only for logged out user
              loggedOutIcons.map((link) => (
                <Link
                  className={location.pathname === link.path ? "active" : ""}
                  to={link.path}
                  key={link.id}
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
