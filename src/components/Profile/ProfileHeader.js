import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/context';
import useUser from '../../hooks/useUser';
import {
    updateFollowingUsersFollowers,
    updateLoggedInUserFollowing,
} from '../../services/services';
import Modal from '../Modal';

const ProfileHeader = ({ user, totalPost }) => {
    const { username, email, photo, followers, following, displayName } = user;
    const { loggedInUser } = useContext(UserContext);
    const isMyProfile = user.uid === loggedInUser.uid;
    const { user: authUser } = useUser();
    const [isFollowingUser, setIsFollowingUser] = useState(followers.includes(loggedInUser.uid));
    const [totalFollowers, setTotalFollowers] = useState(followers.length);

    const handleFollowUser = async () => {
        await updateLoggedInUserFollowing(authUser.docId, user.uid, isFollowingUser);
        await updateFollowingUsersFollowers(user.userDocId, authUser.uid, isFollowingUser);
        await setTotalFollowers(() => (isFollowingUser ? totalFollowers - 1 : totalFollowers + 1));
        await setIsFollowingUser(() => !isFollowingUser);
    };

    const [isModal, setIsModal] = useState(false);
    return (
        <div className="">
            <div>
                <div className="flex md:items-center space-x-2 sm:space-x-12 pr-4 ">
                    <div className="w-4/12 lg:w-3/12 flex flex-col justify-center items-center sm:flex-none">
                        <img
                            className="h-30 w-30 sm:h-36  sm:w-36 md:h-48 md:w-48 rounded-full
						  ml-0 sm:ml-12 md:ml-12 lg:ml-16"
                            src={photo || './images/avatars/placeholder.png'}
                            alt="profile"
                        />
                        <div className="mt-4 md:hidden text-center ml-2 sm:ml-0">
                            <h1 className="font-bold">{displayName}</h1>
                            <h1>{email}</h1>
                        </div>
                    </div>
                    <div className="w-8/12 lg:w-9/12">
                        <div className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            <h1 className="text-3xl md:4xl font-normal">{username}</h1>

                            {!authUser.following && !isMyProfile ? (
                                <Skeleton count={1} height={30} width={100} />
                            ) : authUser.following && !isMyProfile ? (
                                <button
                                    type="button"
                                    className={`py-1 px-8  rounded text-sm font-medium  shadow w-full md:w-max ${
                                        isFollowingUser
                                            ? 'bg-gray-border text-gray-base'
                                            : 'bg-blue text-white'
                                    }`}
                                    onClick={handleFollowUser}
                                >
                                    {isFollowingUser ? 'Unfollow' : 'Follow'}
                                </button>
                            ) : null}

                            {isMyProfile ? (
                                <Link to="/edit">
                                    <button
                                        type="button"
                                        className="py-1 border text-sm rounded font-medium px-4 w-full md:w-max"
                                    >
                                        Edit Profile
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                        <div className="hidden w-6/12 md:flex justify-between my-3">
                            <h1>
                                <span className="font-bold">{totalPost}</span> Post
                            </h1>
                            <h1>
                                <span className="font-bold">{totalFollowers}</span> Followers
                            </h1>
                            <h1>
                                <span className="font-bold">{following.length}</span> Following
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="font-bold">{displayName}</h1>
                            <h1>{email}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between px-12 mt-12 border border-gray-border py-2 text-center text-sm text-gray-base md:hidden">
                    <div className="text-center">
                        <p className="font-bold">{totalPost}</p>
                        <p>Post</p>
                    </div>
                    <div>
                        <p className="font-bold">{totalFollowers}</p>
                        <p>Followers</p>
                    </div>
                    <div>
                        <p className="font-bold">{following.length}</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            {isMyProfile && (
                <motion.button
                    onClick={() => setIsModal(true)}
                    title="Create Post"
                    type="button"
                    whileTap={{ rotateX: 90 }}
                    whileHover={{ scale: 1.1 }}
                    className=" bg-red-rose h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-full text-white text-xl sm:text-2xl md:text-3xl shadow-xl object-right-bottom absolute bottom-4 right-4 sm:bottom-8 sm:right-8 cursor-pointer"
                >
                    <FiEdit />
                </motion.button>
            )}
            {isModal && <Modal user={user} setIsModal={setIsModal} />}
        </div>
    );
};

export default ProfileHeader;
