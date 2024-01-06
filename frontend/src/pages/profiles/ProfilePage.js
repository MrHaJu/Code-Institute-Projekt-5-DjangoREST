import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import {useSetProfileData, useProfileData} from "../../contexts/ProfileDataContext"
import { currentUserContext } from "../../App";
function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const {id} = useParams();
    const setProfileData = useSetProfileData()
    const {pageProfile} = useProfileData();
    
    const [profile] = (pageProfile && pageProfile.results) || [];
    const is_owner = currentUser && currentUser?.username === profile?.owner;
    
  useEffect(() => {
      const fetchData = async () => {
        try {
          const [{ data: pageProfile }] = await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
          ]);
          setProfileData(prevState => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }))
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData()
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
      <Row noGutters className="Text-center">
        <Col lg={3} className="Text-left">
            <Image className="ProfileImage" roundedCircle src={profile?.image}/>
        </Col>
        <Col lg={6}>
          <h3 className="">Profile username</h3>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="Text-right">
        <p>Follow button</p>
        </Col>
        <Col className="">Profile content</Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="Text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
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
      <Col lg={4} className="">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;