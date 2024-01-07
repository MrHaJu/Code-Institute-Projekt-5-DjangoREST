
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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";
import PopularProfiles from "./profiles/PopularProfiles";

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
      const timer = setTimeout(() => {
        fetchPosts();
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [filter, query, pathname]);

    return (
        <main>
            <PreviousSearches onSubmit={(event) => event.preventDefault()} onChange={(value) => setQuery(value)}/>
            <div className="search-box">
                <Form htmlFor="search" onSubmit={(event) => event.preventDefault()}>
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        id="search"
                        type="text"
                        placeholder="Search..."
                    />
                </Form>
                <button htmlFor="search" className="btn">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="recipes-container">
              <Row className="Column">
                <Col md={4} className="Content popprof">
                    <PopularProfiles />
                </Col>
                
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                  
                  {hasLoaded ? (
                    <>
                      {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
                      
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
                
              </Row>
            </div>
        </main>
    );
};

export default Recipes
