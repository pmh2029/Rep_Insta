import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { fireAuth } from '../lib/config';
import SvgIcons from './SvgIcons';

const Header = () => {
    const history = useHistory();

    const {
        user: { photo, username },
    } = useUser();

    const { pathname } = history.location;
    const logoutHandler = () => {
        fireAuth.signOut();
        history.push('/login');
    };
    const [searchTex, setSearchTex] = useState('');
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (searchTex !== '') {
            history.push(`/${searchTex}`);
        }
    };
    return (
        <div className="border-b border-gray-border  bg-white fixed w-full z-50">
            <div className="container mx-auto md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between py-3">
                <div>
                    <Link to="/">
                        <img
                            src="./images/logo.png"
                            className="w-32 px-2 sm:w-auto sm:h-8"
                            alt="instagram-logo"
                        />
                    </Link>
                </div>
                <div>
                    <form action="" onSubmit={onSubmitHandler}>
                        <input
                            value={searchTex}
                            onChange={(e) => setSearchTex(e.target.value)}
                            type="text"
                            placeholder="search user"
                            className="py-3 px-2 h-4 text-sm w-24 rounded sm:w-48 text-gray-base rounded-sm border border-gray-border focus:outline-none bg-gray-bg focus:bg-white"
                        />
                    </form>
                </div>
                <div className="w-48 flex items-center ml-2 mr-2 space-x-2 justify-between cursor-pointer">
                    <div>
                        <Link to="/">
                            {pathname === '/' ? SvgIcons.homeFill : SvgIcons.homeOutline}
                        </Link>
                    </div>
                    <div>
                        <Link className="cursor-pointer" to="/chat">
                            {pathname === '/chat' ? SvgIcons.messageFill : SvgIcons.messageOutline}
                        </Link>
                    </div>
                    <div>{SvgIcons.heartOutline}</div>
                    <div>
                        <FiLogOut className="cursor-pointer" size={22} onClick={logoutHandler} />
                    </div>

                    <div className="h-8 w-8 rounded-full bg-gray-base">
                        <Link to={`/${username}`}>
                            <img
                                src={photo || ' ./images/avatars/placeholder.png'}
                                alt="user"
                                className="h-8 w-8 rounded-full bg-gray-base"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
