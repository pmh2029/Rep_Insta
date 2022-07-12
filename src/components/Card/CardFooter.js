import { formatDistance } from 'date-fns';
import { Picker } from 'emoji-mart';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { VscSmiley } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { FieldValue, fireStore } from '../../lib/config';
import SvgIcons from '../SvgIcons';
import Comments from './Comments';

const CardFooter = ({
    username,
    likes,
    comments,
    dateCreated,
    caption,
    userLiked,
    photoDocId,
    userUId,
    authUserName,
}) => {
    const [toggleLike, setToggleLike] = useState(userLiked);
    const [totalLikes, setTotalLikes] = useState(likes.length);

    const [isPicker, setIsPicker] = useState(false);
    const [message, setMessage] = useState('');
    const [allComments, setAllComments] = useState(comments);

    const commentRef = useRef();
    const addEmojiHandler = (e) => {
        setMessage(message + e.native);
    };

    const handleLike = async () => {
        setToggleLike(() => !toggleLike);
        await fireStore
            .collection('photos')
            .doc(photoDocId)
            .update({
                likes: toggleLike
                    ? FieldValue.arrayRemove(userUId)
                    : FieldValue.arrayUnion(userUId),
            });
        setTotalLikes(() => (toggleLike ? totalLikes - 1 : totalLikes + 1));
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();
        const newComment = {
            username: authUserName,
            comment: message,
            createdAt: Date.now(),
        };
        await fireStore
            .collection('photos')
            .doc(photoDocId)
            .update({
                comments: FieldValue.arrayUnion(newComment),
            });

        setAllComments([...allComments, newComment]);
        setMessage('');
        setIsPicker(false);
    };

    return (
        <div>
            <div className="bg-white flex flex-col p-4">
                <div className="flex justify-between">
                    <div className="flex justify-between space-x-4 mb-2">
                        <button type="button" onClick={handleLike}>
                            <motion.p whileTap={{ rotateX: 360 }}>
                                {toggleLike ? SvgIcons.reactFill : SvgIcons.reactOutline}
                            </motion.p>
                        </button>
                        <button type="button" onClick={() => commentRef.current.focus()}>
                            {SvgIcons.comment}
                        </button>
                        <button type="button">{SvgIcons.share}</button>
                    </div>
                    <button type="button">{SvgIcons.save}</button>
                </div>
                <div className="text-gray-black mb-2 text-md font-bold">
                    {totalLikes} {totalLikes > 1 ? 'likes' : 'Like'}
                </div>
                <div className="text-black">
                    <span className="font-bold">
                        <Link className="hover:underline" to={`/${username}`}>
                            {username}
                        </Link>{' '}
                    </span>
                    {caption}
                </div>
                <div>
                    {allComments.length !== 0 ? (
                        allComments.map((item) => <Comments key={item.createdAt} content={item} />)
                    ) : (
                        <p>No comments yet</p>
                    )}
                </div>
                <div className="text-gray-text text-xs my-2">
                    {formatDistance(dateCreated, new Date())} ago
                </div>
            </div>
            <form onSubmit={addCommentHandler}>
                <div
                    style={{ position: 'relative' }}
                    className="flex justify-between items-center border border-gray-border p-4 space-x-4 bg-white border-l-0 border-r-0"
                >
                    <div>
                        {isPicker && (
                            <Picker
                                style={{ position: 'absolute', bottom: '64px', left: 0 }}
                                onSelect={addEmojiHandler}
                                perLine={8}
                                showSkinTones={false}
                                showPreview={false}
                                emoji="point_up"
                            />
                        )}
                        <button
                            className="group"
                            onClick={() => setIsPicker(!isPicker)}
                            type="button"
                        >
                            <VscSmiley className="group-hover:text-red-rose" size={27} />
                        </button>
                    </div>
                    <input
                        value={message}
                        type="comments"
                        className=" flex-1 py-2 h-6 focus:outline-none text-sm"
                        placeholder="Add a comment.."
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setIsPicker(false)}
                        autoComplete="off"
                        ref={commentRef}
                    />
                    <button
                        type="submit"
                        className="font-bold text-blue"
                        onClick={addCommentHandler}
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CardFooter;
