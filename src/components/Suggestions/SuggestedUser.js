import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    updateFollowingUsersFollowers,
    updateLoggedInUserFollowing,
} from '../../services/services';

const SuggestedUser = ({ user, loggedInDocId, loggedInUserUId }) => {
    const { photo, username, uid: targetUId, docId: targetDocId } = user;
    const [isFollowing, setIsFollowing] = useState(false);

    const updateSuggestedUser = async () => {
        await updateLoggedInUserFollowing(loggedInDocId, targetUId, isFollowing);

        await updateFollowingUsersFollowers(targetDocId, loggedInUserUId, isFollowing);
        await setIsFollowing(true);
    };

    return !isFollowing ? (
        <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-4 items-center">
                <div>
                    <Link to="/profile" className="pointer">
                        <img
                            src={photo || './images/avatars/placeholder.png'}
                            alt="users"
                            className="h-10 w-10 rounded-full"
                        />
                    </Link>
                </div>
                <div>
                    <div>
                        <Link
                            to={`/${username}`}
                            className="font-medium text-black hover:underline pointer text-sm "
                        >
                            {username}
                        </Link>
                    </div>
                    <div className="text-gray-base text-sm">New to instagram</div>
                </div>
            </div>
            <button
                type="button"
                className="text-blue text-sm font-medium disabled:opacity-50"
                onClick={updateSuggestedUser}
                disabled={isFollowing}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    ) : null;
};

export default SuggestedUser;
