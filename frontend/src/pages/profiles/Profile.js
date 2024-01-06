import React, { //useContext 
} from 'react'
//import { currentUserContext } from '../../App';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Profile = (props) => {
    const { profile, mobile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;
  
    const currentUser = useCurrentUser();
    const is_owner = currentUser && currentUser.username === owner;
    return (
    <div className='prof'>
        <div className='' >
            <Link to={`/profiles/${id}`}>
                <Avatar src={image} height={imageSize} />
            </Link>
        </div>
        <div className='Text-left' >
            <strong>{owner}</strong>
        </div>
        <div className='' >
            {!mobile && currentUser && !is_owner && (
        following_id ? (
            <button className='btnsm' onClick={() => {}}>unfollow</button>
        ) : (
            <button className="btnsm" onClick={() => {}}>follow</button>
        )
    )}
        </div>
    </div>
    );
};

export default Profile