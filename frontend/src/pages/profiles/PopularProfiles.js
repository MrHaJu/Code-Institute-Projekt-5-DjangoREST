import React from "react";

import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

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