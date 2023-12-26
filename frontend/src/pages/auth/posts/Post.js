import React from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
//import Avatar from "../../components/Avatar";


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        ingredients,
        image,
        updated_at,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

  return <Card className="Post">
    <Card.Body>
    <Media className='align-items-center justify-content-between'>
        <Link>
        
        </Link>
    </Media>
    </Card.Body>
  </Card>
};

export default Post