import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import usePhotos from '../hooks/usePhotos';
import useUser from '../hooks/useUser';
import Card from './Card/Card';
import SideBar from './SideBar';

const GroupBody = () => {
    const { user } = useUser();
    const { photos } = usePhotos(user.uid, user?.following);
    return (
        <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg flex flex-col-reverse sm:flex-row my-12 mt-24 space-x-0 px-4 sm:space-x-8 justify-center space-y-8 sm:space-y-0">
            <div className="w-12/12 sm:w-8/12 mt-8 sm:mt-0">
                {photos === null ? (
                    <Skeleton height={450} count={6} className="mb-6" />
                ) : photos.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-2xl font-bold">Follow user to see photos</p>
                        <button
                            type="button"
                            className="py-1 px-5 rounded my-2 text-white font-bold bg-blue"
                        >
                            <Link to="/explore">Explore</Link>
                        </button>
                    </div>
                ) : (
                    photos.map((item) => (
                        <Card
                            key={item.photoDocId}
                            userUId={user.uid}
                            photos={item}
                            authUserName={user.username}
                        />
                    ))
                )}
            </div>
            <div className="w-12/12 sm:w-4/12">
                <SideBar user={user} />
            </div>
        </div>
    );
};

export default GroupBody;
