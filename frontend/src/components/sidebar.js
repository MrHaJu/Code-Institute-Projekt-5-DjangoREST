import React

from "react";
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    useCurrentUser,

  } from "../contexts/CurrentUserContext";

export default function Sidebar({links, loggedOutIcons, loggedInIcons, close}){
    const location = useLocation()

    const currentUser = useCurrentUser();

    return (
        <div className="Sidebar" onClick={close}>
            {links.map(link => (
                <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}  key={link.id}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                </Link>
            ))}
            {/* Links for logged in user */}
            {currentUser ? (
                loggedInIcons.map((link) => (
                <Link
                className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                to={link.path}
                key={link.id}
                >
                    <FontAwesomeIcon icon={link.icon} /> {link.name}
                </Link>
                ))
                ) : (
                // Links for logged out user
                loggedOutIcons.map((link) => (
                    <Link
                    className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                    to={link.path}
                    key={link.id}
                    >
                    <FontAwesomeIcon icon={link.icon} /> {link.name}
                    </Link>
                ))
                )}
        </div>
    )
}