import React, {useContext} from 'react';
import {Media} from "react-bootstrap";
import {Link} from "react-router-dom";
import Avatar from '../../components/Avatar';
import { currentUserContext } from "../../App";
import { MoreDropdown } from '../../components/MoreDropdown';
import {axiosRes} from '../../api/axiosDefaults';
const Comment = (props) => {
    const { 
        profile_id, 
        profile_image, 
        owner, updated_at, 
        content, 
        id, 
        setPost, 
        setComments
    } = props

    const currentUser = useContext(currentUserContext);
    const is_owner = currentUser && currentUser.username === owner;
    
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
    <div>
        <Media className='CommentDisplay'>
            <Link to={`/profile/${profile_id}`}>
                <Avatar src={profile_image} />
            </Link>
            <Media.Body>
                <span className='Owner'>{owner}</span>
                <span className='Date'>{updated_at}</span>
                <p className='comment'>{content}</p>
            </Media.Body>
            {is_owner && (
                <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
            )}
        </Media>
    </div>
    
    )
}

export default Comment