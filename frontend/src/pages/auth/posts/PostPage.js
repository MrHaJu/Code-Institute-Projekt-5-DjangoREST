import React, { useEffect, useState, useContext} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams} from "react-router"
import { axiosReq } from "../../../api/axiosDefaults";
import Post from "./Post";

import CommentCreateForm from "../../comments/CommentsCreateForm";
import Comment from "../../comments/Comment";

//import { useCurrentUser } from "../../../contexts/CurrentUserContext";

import { //setCurrentUserContext, 
    currentUserContext } from "../../../App";


function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    
    const currentUser = useContext(currentUserContext);
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    //Debug section
    //console.log("ID",id);
    //console.log("Post", post);
    //console.log("Current User",currentUser);
    //console.log("Ingredients:", post.results[0]?.ingredients);// Here its undefined
    //console.log("Post Item:", post.results[0]);
    //console.log("_________");

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: post}, {data: comments}] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`),
                ]);

                setPost({results: [post]});
                setComments(comments)
            } catch(err) {
                console.log(err)
            }
        };

        handleMount();
    }, [id]);
    return (
        <Row className="">
            <Col className="" lg={8}>
                
                <Post {...post.results[0]} setPosts={setPost} postPage /> 
            <Container className="CommentSection">
            {currentUser ? (
                <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
            />
            ) : comments.results.length ? (
                "Comments:"
            ) : null}
            {comments.results.length ? (
                comments.results.map(comment => (
                    <Comment 
                    key={comment.id} 
                    {...comment} 
                    setPost={setPost}
                    setComments={setComments}
                    />
                ))
            ) : currentUser ? (
                <span className="nocomment">No comments yet, be the first to comment</span>
            ) : (
                <span className="nocomment">No comments... yet</span>
            )}
            </Container>
            </Col>
        </Row>
);
}

export default PostPage;