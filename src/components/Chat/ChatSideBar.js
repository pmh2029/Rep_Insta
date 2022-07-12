import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ChatSideBar = ({ user, userList, setActiveUser, activeUser }) => (
    <div className=" border-b sm:border-b-0 border-r border-gray-border ">
        <div className="flex items-center space-x-3 border-b border-gray-border pb-3 mb-2 p-3">
            <div className="h-12 w-12 ">
                <img
                    className="rounded-full"
                    src={user.photo || './images/avatars/placeholder.png'}
                    alt="authUser"
                />
            </div>
            <div>
                <div className="text-lg font-bold text-black-icon">{user.displayName}</div>
                <div className="text-sm  text-gray-base">{user.username}</div>
            </div>
        </div>
        <div style={{ height: '75.1vh', overflow: 'auto' }}>
            {userList === null ? (
                <Skeleton count={10} height={70} />
            ) : userList.length > 0 ? (
                userList.map((item) => (
                    <div
                        key={item.uid}
                        className={`flex items-center space-x-3 py-3 pl-4  hover:bg-gray-hover  ${
                            item.username === activeUser.username ? 'bg-gray-active' : 'bg-white'
                        }`}
                        onClick={() => setActiveUser(item)}
                        role="button"
                        tabIndex="0"
                    >
                        <div className="h-10 w-10 ">
                            <img
                                className="rounded-full"
                                src={item.photo || './images/avatars/placeholder.png'}
                                alt="followingUsers"
                            />
                        </div>
                        <div>
                            <div className="text-base text-black-icon">{item.username}</div>
                            <div className="text-sm  text-gray-text">last messages</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>follow users to see messages</p>
            )}
        </div>
    </div>
);

export default ChatSideBar;
