import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUserByID } from '../services/services';

const DeleteUsers = ({ user }) => {
    <div className="flex justify-between items-center p-2 px-8 mb-1">
        <div className="flex items-center">
            <div className="mr-8">
                <img
                    src={user.photo || './images/avatars/placeholder.png'}
                    className="h-12 w-12 rounded-full"
                    alt="userProfiles"
                />
            </div>
            <div className="mr-12">
                <div>
                    <Link
                        className="text-md font-medium hover:underline"
                        to={`/${user.username}`}
                    >
                        {user.username}
                    </Link>
                </div>
                <div>new to instagram</div>
            </div>
        </div>
        <button
            className="bg-blue text-white p-1 px-3 rounded shadow text-sm font-medium "
            type="button"
            onClick={deleteUserByID}
        >
            Follow
        </button>
    </div>
};

export default DeleteUsers;
