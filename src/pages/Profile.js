import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserProfile from '../components/Profile/UserProfile';
import { getUserByUserName } from '../services/services';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const history = useHistory();
    useEffect(() => {
        const getUserProfileDetails = async () => {
            const result = await getUserByUserName(username);
            if (result !== null) {
                setUser(result);
            } else {
                history.push('/notfound');
            }
        };
        getUserProfileDetails();
    }, [history, username]);

    return (
        <div>
            <Helmet>
                <title>Instagram | Profile</title>
            </Helmet>
            <div className="h-screen overflow-auto">
                <Header />
                {user && user.username && <UserProfile user={user} />}
            </div>
        </div>
    );
};

export default Profile;
