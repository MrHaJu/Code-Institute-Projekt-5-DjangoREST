import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";


const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          console.log(err);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      navigate(-1);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className="btn"
        onClick={() => navigate(-1)}
      >
        cancel
      </Button>
      <Button className="btn" type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="" md={7} lg={6}>
          <Container className='Content'>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className='btn'
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="">{textFields}</div>
          </Container>
        </Col>
        
      </Row>
    </Form>
  );
};

export default ProfileEditForm;