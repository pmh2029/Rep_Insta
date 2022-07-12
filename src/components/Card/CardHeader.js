import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const CardHeader = ({ username, avatar }) => (
    <div className="bg-white py-4 flex justify-between items-center px-4 h-16 ">
        <div className="flex space-x-4 items-center ">
            <div>
                <img
                    src={avatar || './images/avatars/placeholder.png'}
                    className="h-12 w-12 bg-gray-base bg-gradient-to-t from-orange to-pink p-0.5 border-pink rounded-full border-xl"
                    alt="profile"
                />
            </div>
            <div className="text-base font-semibold hover:font-underline hover:underline cursor-pointer">
                <Link to={`/${username}`}>{username}</Link>
            </div>
        </div>
        <button type="button">
            <FontAwesomeIcon icon={faEllipsisH} />
        </button>
    </div>
);

export default CardHeader;
