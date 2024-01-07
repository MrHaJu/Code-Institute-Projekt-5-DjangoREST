import React, { useEffect, useState, 

} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams} from "react-router"
import { axiosReq } from "../../../api/axiosDefaults";
import Post from "./Post";

import CommentCreateForm from "../../comments/CommentsCreateForm";
import Comment from "../../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../../components/Asset";
import { fetchMoreData } from "../../../utils/utils";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import PopularProfiles from "../../profiles/PopularProfiles";



function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();

    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });



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
                //console.log(err)
            }
        };

        handleMount();
    }, [id]);
    return (
        <Row className="">
            <Col className="" lg={8}>
            <PopularProfiles />
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
                <p className="Text-center">Comments:</p>
            ) : null}
            {comments.results.length ? (
            <InfiniteScroll
                children={comments.results.map((comment) => (
                    <Comment
                        key={comment.id}
                        {...comment}
                        setPost={setPost}
                        setComments={setComments}
                    />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
            />
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