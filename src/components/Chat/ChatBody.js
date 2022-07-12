import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { getFollowingUsersInfo } from '../../services/services';
import ChatBox from './ChatBox';
import ChatSideBar from './ChatSideBar';
import IntroMessage from './IntroMessage';

const ChatBody = () => {
    const { user } = useUser();
    const [userList, setUserList] = useState(null);
    useEffect(() => {
        const getFollowingUsers = async () => {
            const result = await getFollowingUsersInfo(user.following);
            setUserList(result);
        };
        if (user.following && user.following.length > 0) {
            getFollowingUsers();
        }
    }, [user.following]);
    const [activeUser, setActiveUser] = useState({});
    const [drawer, setDrawer] = useState(false);
    return (
        <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg flex my-12 mt-24  border border-gray-border shadow bg-white relative over-follow-x-hidden ">
            <div
                style={{ transition: ' all linear .31s' }}
                className={`absolute z-10 bg-white inset-y-0 left-0 ${
                    drawer ? 'w-0 overflow-x-hidden bottom-0 ' : 'w-8/12 block'
                } sm:static sm:block sm:w-4/12 `}
            >
                {user.following && user.following.length > 0 ? (
                    <div className="">
                        <ChatSideBar
                            user={user}
                            userList={userList}
                            setActiveUser={setActiveUser}
                            activeUser={activeUser}
                        />
                    </div>
                ) : (
                    <div
                        style={{ height: '75vh' }}
                        className="flex items-center text-center px-2 border-r border-gray-border"
                    >
                        <h1 className="flex-1 font-medium">Follow users to sent Messages</h1>
                    </div>
                )}
            </div>
            <div className="w-full sm:w-8/12">
                {activeUser.username ? (
                    <ChatBox
                        user={user}
                        activeUser={activeUser}
                        drawer={drawer}
                        setDrawer={setDrawer}
                    />
                ) : (
                    <div className="hidden sm:block">
                        <IntroMessage />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBody;
