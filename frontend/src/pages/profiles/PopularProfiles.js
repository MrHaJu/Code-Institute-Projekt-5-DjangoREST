import React, { useContext, useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { currentUserContext } from '../../App';
import Asset from "../../components/Asset";
import Profile from './Profile';
const PopularProfiles = () => {
    const [profileData, setProfileData] = useState({
        // we will use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });
    const { popularProfiles } = profileData;
    const currentUser = useContext(currentUserContext);
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-posts_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {
            console.log(err);
            }
        };
    
        handleMount();
    }, [currentUser]);
    
    return (
        <div className='Post'>
            {popularProfiles.results.length ? (
            <div >
            <h4 className='ProfTitle'>Top 4 Users with the most posted recipes:</h4>
            <div className='MfProf'>
                {popularProfiles.results.slice(0,4).map((profile) => (
                    
                    <Profile key={profile.id} profile={profile} />
                ))}
                </div>
            </div>
            ) : (
                <Asset spinner />
            )}
        </div>
    )};


export default PopularProfiles;