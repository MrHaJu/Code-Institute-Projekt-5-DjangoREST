import React, {  
  useState, useEffect } from 'react'

import {
  useCurrentUser,

} from "../../../contexts/CurrentUserContext";

import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { axiosRes } from '../../../api/axiosDefaults';
import {
  faHeart,
  faHeartBroken,
  faComments,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { MoreDropdown } from '../../../components/MoreDropdown';




const Post = (props) => {
  const {
    id,
    owner,

    profile_id,
    profile_image,
    comments_count,
    bookmarks_count,
    likes_count,
    like_id,
    title,
    content,
    ingredients,
    image,
    updated_at,

    setPosts,
  } = props;
  const [isBookmarked, setIsBookmarked] = useState(null);

  const currentUser = useCurrentUser();

  const post_id = id
  const is_owner = currentUser && currentUser.username === owner;
  const navigate = useNavigate();
  const postPage = true



  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      navigate("/recipes");
    } catch (err) {
      console.log(err);
    }
  }

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
      if (currentUser) {
      const fetchBookmarkStatus = async () => {
        try {
          
            const response = await axios.get(`/posts/${post_id}/bookmark_status/`);
            setIsBookmarked(response.data.bookmarked);
          
        } catch (error) {
          console.error('Fehler beim Laden des Bookmark-Status', error);
        }
      };
  
      fetchBookmarkStatus();}
    }, [post_id, currentUser]);
  
    const handleBookmark = async () => {
      try {
        if (isBookmarked) {
          
          await axios.delete(`/posts/${post_id}/unbookmark/`);
        } else {
          
          await axios.post(`/posts/${post_id}/bookmark/`);
        }
        setIsBookmarked(!isBookmarked);
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Bookmarks', error);
      } 
    };

    const ingredientsArray = ingredients?.split(',').map(ingredient => ingredient.trim()) || [];

  return (
    <Card className="Post">
    <Card.Body>
      <Media className="PostHead">
        <Link className='PostUser' to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <div className="PostUser">
          <span>{updated_at}</span>
          {is_owner && postPage && <MoreDropdown 
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isOwner={is_owner}/>}
        </div>
      </Media>
    </Card.Body>
    <Link to={`/recipes/${id}`}>
      <Card.Img className="PostImage" src={image} alt={title} />
    </Link>
    <Card.Body>
      {title && <Card.Title className="Text-center">{title}</Card.Title>}
      {ingredientsArray.length > 0 && (
  <div className="Text-center">
    <br></br>
    <h4 className='ingredientsTitle'>Ingredients:</h4>
    <ul className="IList">
      {ingredientsArray.map((ingredient, index) => (
        <li className="Text-left" key={index}> {ingredient}</li>
      ))}
    </ul>
    <br></br>
  </div>
)}
      {content && <div className='Text-left'>
        <h4 className='ingredientsTitle'>Recipe:</h4>
        {content}
        </div>}
      <div className="PostBar">
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post!</Tooltip>}
          >
            <div className='PostUser'>
            <FontAwesomeIcon icon={faHeartBroken} className='Icons' />
            {likes_count}
            </div>
          </OverlayTrigger>
        ) : like_id ? (
          <span onClick={handleUnlike}>
            <FontAwesomeIcon icon={faHeart} className='Icons red' />
            {likes_count}
          </span>
        ) : currentUser ? (
          <span onClick={handleLike}>
              <FontAwesomeIcon icon={faHeartBroken} className='Icons ' />
              {likes_count}
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to like posts!</Tooltip>}
          >
            <div className='PostUser'>
              <FontAwesomeIcon icon={faHeartBroken} className='Icons' />
              {likes_count}
            </div>
          </OverlayTrigger>
        )}
        
        <Link className='PostUser' to={`/recipes/${id}`}>
        <FontAwesomeIcon icon={faComments} className='Icons' />
        {comments_count}
        </Link>
        {currentUser && (
            <span onClick={handleBookmark} className='PostUser'>
              <FontAwesomeIcon icon={faBookBookmark} className={`Post ${isBookmarked ? 'active-bookmark' : 'inactive-bookmark'} Icons `} />
              {bookmarks_count}
            </span>
          )}
        </div>
      </Card.Body>
  </Card>
  );
};

export default Post