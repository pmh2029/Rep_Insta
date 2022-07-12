import React from 'react';
import { Helmet } from 'react-helmet';
import ChatBody from '../components/Chat/ChatBody';
import Header from '../components/Header';

const ChatBoard = () => (
    <div>
        <Helmet>
            <title>Instagram | Chat</title>
        </Helmet>
        <div className="h-screen overflow-y-hidden">
            <Header />
            <ChatBody />
        </div>
    </div>
);

export default ChatBoard;
