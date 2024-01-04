import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { axiosReq } from "../../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";

function PostEditForm() {
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
  const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/posts/${id}`)
                const {title, ingredients, content, image, is_owner} = data;
                is_owner ? setPostData({title, ingredients, content, image }) : navigate("/");
            } catch(err) {
                console.log(err)
            }
        };
        handleMount();
    }, [navigate, id]);
  const handleGoBack = () => {
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
    
    if (imageInput?.current?.files[0]){
    formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/recipes/${id}`)
    } catch(err) {
      console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }


  const textFields = (
    <div className="upload-form">
      <Form.Group className="Title flex-item">
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
      <Form.Group className="Ingredients flex-item">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
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
      <Form.Group className="Content flex-item">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
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
      <div className="buttons flex-item">
      <button
        className="btn"
        onClick={handleGoBack}
      >
        cancel
      </button>
      <button className="btn" type="submit">
        Save
      </button>
      </div>
    </div>
  );

  return (
    <Form className="post-create-form" onSubmit={handleSubmit}>
      <Row>
        <Col className="">
          <Container>
            <Form.Group className="image-preview">
              
                  <figure>
                    <Image className="Image" src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className="image-text"
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
              <Form.File
              className="upload"
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
        <div className="text-fields">
          <div className="Container">{textFields}</div>
        </div>
      </Row>
    </Form>
  );
}

export default PostEditForm;