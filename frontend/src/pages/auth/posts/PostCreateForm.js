import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../../assets/upload.png";

import Asset from "../../../components/Asset";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router";
//import axios from "axios";
import { axiosReq } from "../../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    ingredients: "",
    image: "",
  });
  const { title, content, ingredients, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();
  const handleGoBack = () => {
    // Überprüfe, ob es eine vorherige Seite gibt, bevor du zurücknavigierst
    window.history.length > 1 && navigate(-1);
  };
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('ingredients', ingredients);
    formData.append('image', imageInput.current.files[0]);

    try {
      const {data} = await axiosReq.post('/posts/', formData);
      navigate(`/posts/${data.id}`)
    } catch(err) {
      console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
          </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
          </Alert>
      ))}
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
          </Alert>
      ))}
      <Button
        className="btn"
        onClick={handleGoBack}
      >
        cancel
      </Button>
      <Button className="btn" type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form className="post-create-form" onSubmit={handleSubmit}>
      <Row>
        <Col className="image-container">
          <Container className="Container">
            <Form.Group className="image-preview">
              {image ? (
                <>
                  <figure>
                    <Image className="Image" src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className="btn"
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="image-container"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}
  
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
        <Col md={5} lg={4} className="text-fields">
          <Container className="Container">{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;