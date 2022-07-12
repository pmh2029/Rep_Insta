import React, { useEffect, useState } from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';
import { getUserPhotosByUId } from '../../services/services';
import SvgIcons from '../SvgIcons';

const UserPhotos = ({ user, setTotalPost }) => {
    const [userPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        const getAllUserPhotos = async () => {
            const result = await getUserPhotosByUId(user.uid);
            setUserPhotos(result);
            setTotalPost(result.length);
        };
        getAllUserPhotos();
    }, [setTotalPost, user]);
    return (
        <div className="h-max border-t border-gray-border mt-12 pt-4">
            {userPhotos === null ? (
                <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-8 mt-4 mb-12">
                    <Skeleton height={200} count={1} />
                    <Skeleton height={200} count={1} />
                    <Skeleton height={200} count={1} />
                </div>
            ) : userPhotos.length === 0 ? (
                <div className="flex items-center w-full bg-white space-x-2 p-3">
                    <div className="w-6/12 md:flex justify-end">
                        <img className="md:h-64" src="./images/nophotos.jpg" alt="nophotos" />
                    </div>
                    <div className="w-6/12 text-center">
                        <h1 className="text-xl md:text-2xl font-bold">No photos Available!</h1>
                        <p>Start capturing and Sharing your Moments</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-1 sm:gap-8 mt-4 mb-12">
                    {userPhotos.map((item) => (
                        <div className="relative group" key={item.photoDocId}>
                            <img
                                className="h-48 w-full object-cover"
                                src={item.imageSrc}
                                alt="itemCaption"
                            />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <div className="flex space-x-2 text-white">
                                    <div>{SvgIcons.reactFillWhite}</div>
                                    <p className="text-white font-bold">{item.likes.length}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <div>
                                        <BsFillChatFill className="text-white" size={24} />
                                    </div>
                                    <p className="text-white font-bold">{item.comments.length}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPhotos;
