import React from 'react';

const CardImage = ({ imageSrc }) => (
    <div className="h-auto  ">
        <img
            style={{ maxHeight: '750px' }}
            src={imageSrc}
            alt="users-img"
            className="w-full h-auto object-cover"
        />
    </div>
);

export default CardImage;
