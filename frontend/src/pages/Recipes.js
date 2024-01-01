
import PreviousSearches from "../components/previousSearches";
import React, { useEffect, useState } from "react";
import Asset from "../components/Asset";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import Post from "./auth/posts/Post";
import NoResults from "../assets/no-results.png";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import appStyles from "../../App.module.css";
//import styles from "../../styles/PostsPage.module.css";


function Recipes({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
          setPosts(data);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
  
      setHasLoaded(false);
      fetchPosts();
    }, [filter, query, pathname]);

    return (
        <main>
            <PreviousSearches onSubmit={(event) => event.preventDefault()} onChange={(event) => setQuery(event.target.value)}/>
            <div className="recipes-container">
              <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                  <div className="search-box">
                  <Form onSubmit={(event) => event.preventDefault()}>
                    <Form.Control value={query} onChange={(event) => setQuery(event.target.value)}  type="text" placeholder="Search..."/>
                  </Form>
                  <button  className='btn'><FontAwesomeIcon icon={faSearch} /></button>
                  </div>
                  {hasLoaded ? (
                    <>
                      {posts.results.length ? (
                      posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} />
                      ))
                    ) : (
                      <Container className="Content">
                        <Asset src={NoResults} message={message} />
                      </Container>
                    )}
                  </>
                  ) : (
                    <Container className="Content">
                      <Asset spinner />
                    </Container>
                  )}
                </Col>
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">

                </Col>
              </Row>
            </div>
        </main>
    );
};

export default Recipes
