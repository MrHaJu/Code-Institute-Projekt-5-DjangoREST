import React, { useState, useEffect } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { axiosRes } from '../../../api/axiosDefaults';
import {
  faHeart,
  faComments,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
const Post = (props) => {
  const {
    id,
    owner,
    post_id,
    profile_id,
    profile_image,
    comments_count,
    bookmark_count,
    likes_count,
    like_id,
    title,
    content,
    ingredients,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const currentUser = useCurrentUser();
    console.log(currentUser);
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  
    useEffect(() => {
      
      const fetchBookmarkStatus = async () => {
        try {
          const response = await axios.get(`/bookmark_status/${post_id}/`);
          setIsBookmarked(response.data.is_bookmarked);
        } catch (error) {
          console.error('Fehler beim Laden des Bookmark-Status', error);
        }
      };
  
      fetchBookmarkStatus();
    }, [post_id]);
  
    const handleBookmark = async () => {
      try {
        if (isBookmarked) {
          
          await axios.delete(`/unbookmark/${post_id}/`);
        } else {
          
          await axios.post(`/bookmark/${post_id}/`);
        }
        setIsBookmarked(!isBookmarked);
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Bookmarks', error);
      }
    };

  return (
    <Card className="Post">
    <Card.Body>
      <Media className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
          {is_owner && postPage && "..."}
        </div>
      </Media>
    </Card.Body>
    <Link to={`/posts/${id}`}>
      <Card.Img className="PostImage" src={image} alt={title} />
    </Link>
    <Card.Body>
      {title && <Card.Title className="text-center">{title}</Card.Title>}
      {ingredients && <Card.Text>{ingredients}</Card.Text>}
      {content && <Card.Text>{content}</Card.Text>}
      <div className="PostBar">
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        ) : like_id ? (
          <span onClick={handleUnlike}>
            <FontAwesomeIcon icon={faHeart} className="HeartOutline" />
          </span>
        ) : currentUser ? (
          <span onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to like posts!</Tooltip>}
          >
            <FontAwesomeIcon icon={faHeart} className="HeartOutline" />
          </OverlayTrigger>
        )}
        {likes_count}
        <Link to={`/posts/${id}`}>
        <FontAwesomeIcon icon={faComments} />
        </Link>
        {comments_count}
        <span onClick={handleBookmark}>
            <FontAwesomeIcon icon={faBookBookmark}>
              {isBookmarked ? '/Unbookmark/' : '/bookmark/'}
            </FontAwesomeIcon>
            {bookmark_count}
          </span>
        
      </div>
    </Card.Body>
  </Card>
  );
};

export default Post