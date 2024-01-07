import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useNavigate, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const UserPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      navigate("/");
    }
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      //console.log(err);
      setErrors(err.response?.data);
    }
  };
  const togglePassword = () => {
    const passwordInput1 = document.getElementById("password1");
    const passwordInput2 = document.getElementById("password2");
  
    if (passwordInput1 && passwordInput2) {
      // Toggle visibility for password1
      if (passwordInput1.type === "password") {
        passwordInput1.type = "text";
      } else {
        passwordInput1.type = "password";
      }
  
      // Toggle visibility for password2
      if (passwordInput2.type === "password") {
        passwordInput2.type = "text";
      } else {
        passwordInput2.type = "password";
      }
    }
  };
  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className="Content">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                id="password1"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                id="password2"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
              
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <div className="password-checkbox">
          <label htmlFor="checkbox">Show Password </label>
          <input id="checkbox" type="checkbox" onClick={togglePassword} />
          </div>
          {errors.confirmPassword?.map((message, idx) => (
            <div className="alert alert-warning" key={idx}>
              {message}
              </div>))}
            <div className="buttonspacer">
              <Button
                className="btnsm"
                onClick={() => navigate(-1)}
              >
                cancel
              </Button>
              <Button className="btnsm" type="submit">
                save
              </Button>
            </div>
            
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;