import React from 'react';
import { Helmet } from 'react-helmet';
import Account from '../components/Account';
import Header from '../components/Header';

const EditProfile = () => (
    <div>
        <Helmet>
            <title>Edit Profile</title>
        </Helmet>
        <div className="h-screen overflow-auto">
            <Header />
            <Account />
        </div>
    </div>
);

export default EditProfile;
