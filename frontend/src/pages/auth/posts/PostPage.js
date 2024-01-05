import React, { useEffect, useState, useContext} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams} from "react-router"
import { axiosReq } from "../../../api/axiosDefaults";
import Post from "./Post";

import CommentCreateForm from "../../comments/CommentsCreateForm";
//import { useCurrentUser } from "../../../contexts/CurrentUserContext";

import { //setCurrentUserContext, 
    currentUserContext } from "../../../App";


function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    //const setCurrentUser = useContext(setCurrentUserContext);
    const currentUser = useContext(currentUserContext);
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    console.log("ID",id);
    console.log("Post", post);
    console.log("Current User",currentUser);
    console.log("Ingredients:", post.ingredients);
    console.log("_________");

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: post}] = await Promise.all([
                    axiosReq.get(`/posts/${id}`)
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
            {currentUser ? (
                <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
            />
            ) : comments.results.length ? (
                "Comments"
            ) : null}
            </Container>
            </Col>
            <Col lg={4} className="">
                Popular profiles for desktop
            </Col>
        </Row>
);
}

export default PostPage;