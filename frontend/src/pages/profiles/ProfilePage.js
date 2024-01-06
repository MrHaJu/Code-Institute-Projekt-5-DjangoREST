import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../auth/posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import {useSetProfileData, useProfileData} from "../../contexts/ProfileDataContext"
import { ProfileEditDropdown } from "../../components/MoreDropdown";
//import { currentUserContext } from "../../App";
function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
    const is_owner = currentUser && currentUser?.username === profile?.owner;
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [{ data: pageProfile }, { data: profilePosts }] =
            await Promise.all([
              axiosReq.get(`/profiles/${id}/`),
              axiosReq.get(`/posts/?owner__profile=${id}`),
            ]);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }));
          setProfilePosts(profilePosts);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [id, setProfileData]);


//Debug zone:
//console.log("_____________");
//console.log(pageProfile);
//console.log(currentUser);
//console.log(id);
//console.log(is_owner);
//console.log(profile);
//console.log();
//console.log();


  const mainProfile = (
    <>
      
      <Row noGutters className="FlexRows">
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Col lg={3} className="Text-left">
            <Image className="ProfileImage" roundedCircle src={profile?.image}/>
        </Col>
        <Col lg={6}>
          <h3 className="Text-center">{profile?.owner}</h3>
          <Row className="FlexRows">
            <Col xs={3} className="Text-center">
              <div>{ profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="Text-center">
              <div>{ profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="Text-center">
              <div>{ profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="Text-right">
        {currentUser && 
        !is_owner && 
        (profile?.following_id ? (
          <button 
          className="btnsmno" 
          onClick={() => handleUnfollow(profile)}
          >
            unfollow
            </button>
        ) : (
          <button 
          className="btnsm" 
          onClick={() => handleFollow(profile)}
          >
            follow
            </button>
        ))}
        </Col>
        {profile?.content && (<Col className="">{profile.content}</Col>)}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col lg={2} className="">
        <PopularProfiles />
      </Col>
      <Col className="" lg={8}>
        <Container className='Content'>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      
    </Row>
  );
}

export default ProfilePage;