import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    faEllipsisV,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <FontAwesomeIcon icon={faEllipsisV} 
        className="Icons"
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="DdMenu"
                popperConfig={{ strategy: "fixed" }}
            >
            <Dropdown.Item
                className="DropdownItem"
                onClick={handleEdit}
                aria-label="edit"
            >
                <FontAwesomeIcon icon={faEdit} className="Icons" />
            </Dropdown.Item>
            <Dropdown.Item
                className="DropdownItem"
                onClick={handleDelete}
                aria-label="delete"
            >
                <FontAwesomeIcon icon={faTrash} className="Icons" />
            </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export function ProfileEditDropdown({ id }) {
    const navigate = useNavigate();
    return (
      <Dropdown className="Absolute" drop="left">
        <Dropdown.Toggle as={ThreeDots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> edit profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            change username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

