import React from "react";
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    useCurrentUser,

} from "../contexts/CurrentUserContext";
import { Row } from "react-bootstrap";
import Avatar from "./Avatar";


export default function Sidebar({links, loggedOutIcons, loggedInIcons, close}){
    const location = useLocation()
    const currentUser = useCurrentUser();
    
    return (
        <div className="Sidebar" onClick={close}>
            <div>
            {currentUser && (
        <Link
            className="nav-links Text-center row" key="profilesb" id="profilesb"
            to={`/profiles/${currentUser.profile_id}`}
        >
            <Row>
                <Avatar className="Avatar" src={currentUser.profile_image} height={40} />
            </Row>
            <Row>
                <p className="NavProftext">Profile</p>
            </Row>
        </Link>
        )}
            </div>
            {links.map(link => (
                <Link 
                to={link.path} 
                className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}  
                key={link.id}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                </Link>
            ))}
            {currentUser ? (
                //Links for logged in user
                loggedInIcons.map((link) => (
                    <Link
                    className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                    to={link.path}
                    key={link.id}
                    onClick={(event) => { event.stopPropagation(); link.onClick(); }}
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