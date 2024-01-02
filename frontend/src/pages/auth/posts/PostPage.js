import React, { useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams} from "react-router"
import { axiosReq } from "../../../api/axiosDefaults";
import Post from "./Post";
function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

console.log("ID",id);
console.log("Post", post);
console.log("_________");
console.log();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: post}] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`)
                ])
                setPost({results: [post]})
                console.log(post)
            } catch(err) {
                console.log(err)
            }
        };

        handleMount();
    }, [id]);
    return (
        <Row className="">
            <Col className="" lg={8}>
                <p>Popular profiles for mobile</p>
                <Post {...post.results[0]} setPosts={setPost} postPage />
            <Container className="">
                Comments
            </Container>
            </Col>
            <Col lg={4} className="">
                Popular profiles for desktop
            </Col>
        </Row>
);
}

export default PostPage;