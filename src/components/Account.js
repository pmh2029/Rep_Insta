import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { fireAuth, fireStore } from '../lib/config';
import { checkExistingUserName } from '../services/services';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';

const Account = () => {
    const { user } = useUser();
    const [initialState, setInitialState] = useState({});
    const [isDisplayName, setIsDisplayName] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [isUserName, setIsUserName] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const [isUrl, setIsUrl] = useState('');
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (user.email) {
            setIsDisplayName(user.displayName);
            setIsEmail(user.email);
            setIsUserName(user.username);
            const newState = {
                displayName: user.displayName,
                email: user.email,
                username: user.username,
                photo: user.photo,
            };
            setInitialState(newState);
        }
    }, [user.displayName, user.docId, user.email, user.photo, user.username]);
    const isUpdatable =
        (initialState.displayName !== isDisplayName && isDisplayName !== '') ||
        (initialState.email !== isEmail && isEmail !== '') ||
        (initialState.username !== isUserName && isUserName !== '') ||
        (initialState.photo !== isUrl && isUrl !== '');
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleProfilePhoto = (e) => {
        const selected = e.target.files[0];
        const isValid = validTypes.includes(selected.type);

        if (isValid) {
            setFile(selected);
            setError('');
        } else {
            setError('Please select a valid Image');
            setFile(null);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            if (isUserName !== initialState.username) {
                const isNameAvailable = await checkExistingUserName(isUserName);
                if (isNameAvailable) {
                    if (isEmail !== initialState.email) {
                        await fireAuth.currentUser.updateEmail(isEmail);
                    }

                    await fireAuth.currentUser.updateProfile({
                        displayName: isDisplayName || initialState.displayName,
                        photoURL: isUrl || initialState.photo,
                    });
                    await fireStore
                        .collection('users')
                        .doc(user.docId)
                        .update({
                            username: isUserName,
                            email: isEmail || initialState.email,
                            displayName: isDisplayName || initialState.displayName,
                            photo: isUrl || initialState.photo,
                        });
                    await setLoader(false);
                    await setError('');
                    await setInitialState({
                        ...initialState,
                        displayName:
                            isDisplayName !== '' ? isDisplayName : initialState.displayName,
                        email: isEmail !== '' ? isEmail : initialState.email,
                        username: isUserName !== '' ? isUserName : initialState.username,
                        photo: isUrl !== '' ? isUrl : initialState.photo,
                    });
                } else {
                    // eslint-disable-next-line no-throw-literal
                    throw { message: 'username not available' };
                }
            } else if (isUserName === initialState.username) {
                if (isEmail !== initialState.email) {
                    await fireAuth.currentUser.updateEmail(isEmail);
                }

                await fireAuth.currentUser.updateProfile({
                    displayName: isDisplayName || initialState.displayName,
                    photoURL: isUrl || initialState.photo,
                });
                await fireStore
                    .collection('users')
                    .doc(user.docId)
                    .update({
                        email: isEmail || initialState.email,
                        displayName: isDisplayName || initialState.displayName,
                        photo: isUrl || initialState.photo,
                    });
                await setLoader(false);
                await setError('');
                await setInitialState({
                    ...initialState,
                    displayName: isDisplayName !== '' ? isDisplayName : initialState.displayName,
                    email: isEmail !== '' ? isEmail : initialState.email,
                    photo: isUrl !== '' ? isUrl : initialState.photo,
                });
            }
        } catch (err) {
            setLoader(false);
            setError(err.message);
        }
    };
    return (
        <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg  my-12 mt-24 bg-white border border-gray-border p-4 h-max rounded">
            <div className="flex items-center  mb-6">
                <button type="button" className="text-blue font-2xl">
                    <Link to={`/${user.username}`}>
                        <MdArrowBack size={25} />
                    </Link>
                </button>
                <h1 className="font-2xl flex-1  font-bold text-black-icon  text-center">
                    Edit Profile
                </h1>
            </div>

            {user.email ? (
                <form action="" onSubmit={submitHandler}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4 items-center">
                            <div className="w-4/12 flex sm:justify-end">
                                <img
                                    className="rounded-full w-24 h-24 mr-8"
                                    src={isUrl || user.photo || './images/avatars/placeholder.png'}
                                    alt="profile"
                                />
                            </div>
                            <div>
                                <h1 className="text-bold text-2xl">{user.username}</h1>

                                <label
                                    htmlFor="profilePhoto"
                                    name="profile"
                                    className="font-medium  text-blue"
                                >
                                    Change Profile Picture
                                    <input
                                        className="hidden"
                                        type="file"
                                        id="profilePhoto"
                                        name="profile"
                                        onChange={handleProfilePhoto}
                                    />
                                </label>
                            </div>
                        </div>
                        {file !== null && (
                            <ProgressBar file={file} setFile={setFile} setIsUrl={setIsUrl} />
                        )}
                        <div className="flex space-x-4 items-center md:mr-12">
                            <p className="w-3/12 font-bold text-right">Email</p>
                            <input
                                value={isEmail}
                                type="email"
                                placeholder="email"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white disabled:opacity-50"
                                onChange={({ target }) => setIsEmail(target.value)}
                            />
                        </div>
                        <div className="flex space-x-4 items-center md:mr-12">
                            <p className="w-3/12 font-bold text-right">username</p>
                            <input
                                value={isUserName}
                                type="text"
                                placeholder="username"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                                onChange={({ target }) => setIsUserName(target.value)}
                            />
                        </div>
                        <div className="flex space-x-4 items-center md:mr-12">
                            <p className="w-3/12 font-bold text-right">Full Name</p>
                            <input
                                value={isDisplayName}
                                type="text"
                                placeholder="Full Name"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                                onChange={({ target }) => setIsDisplayName(target.value)}
                            />
                        </div>
                        <div className="flex space-x-4 items-center justify-center ">
                            <button
                                disabled={!isUpdatable}
                                type="submit"
                                className="w-5/12 bg-blue text-white font-bold h-8 rounded disabled:opacity-50 flex justify-center items-center disabled:opacity-50"
                            >
                                {loader ? <Spinner /> : 'Update Profile'}
                            </button>
                        </div>

                        {error && <div className="my-3 text-center text-red-error">{error}</div>}
                    </div>
                </form>
            ) : (
                <Skeleton count={7} height={50} className="mb-2" />
            )}
        </div>
    );
};

export default Account;
