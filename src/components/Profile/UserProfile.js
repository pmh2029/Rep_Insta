import React, { useState } from 'react';

import ProfileHeader from './ProfileHeader';
import UserPhotos from './UserPhotos';

const UserProfile = ({ user }) => {
    const [totalPost, setTotalPost] = useState(0);

    return (
        <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg flex flex-col my-12 mt-24 px-2 sm:px-0">
            <ProfileHeader user={user} totalPost={totalPost} />
            <UserPhotos user={user} setTotalPost={setTotalPost} />
        </div>
    );
};

export default UserProfile;
