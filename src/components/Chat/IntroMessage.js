import React from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

const IntroMessage = () => (
    <div style={{ height: '74vh' }}>
        <div className=" items-center h-full w-full flex items-center justify-center">
            <div className=" flex flex-col items-center ">
                <div className="h-24 w-24  border-2 rounded-full  flex items-center justify-center">
                    <RiSendPlaneFill className="text-4xl" />
                </div>
                <h3 className="text-2xl font-light">Your Messages</h3>
                <p className="text-sm text-gray-text">Send private messages to a friend </p>
            </div>
        </div>
    </div>
);

export default IntroMessage;
