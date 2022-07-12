import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { fireAuth, fireStore } from '../lib/config';
import { checkExistingUserName } from '../services/services';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const isInvalid = email === '' || password === '' || userName === '' || fullName === '';
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        const isNameAvailable = await checkExistingUserName(userName);

        if (isNameAvailable) {
            try {
                const createdResult = await fireAuth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                await createdResult.user.updateProfile({
                    displayName: fullName,
                });
                await fireStore.collection('users').add({
                    uid: createdResult.user.uid,
                    username: userName.toLowerCase(),
                    displayName: fullName,
                    email: email.toLowerCase(),
                    following: [],
                    followers: [],
                    photo: '',
                    dateCreated: Date.now(),
                });
                setLoader(false);
                history.push('/');
            } catch (err) {
                setLoader(false);
                setError(err.message);
                setUserName('');
                setFullName('');
                setEmail('');
                setPassword('');
            }
        } else {
            setLoader(false);
            setUserName('');
            setError('Username already Exists! Try a different Username...');
        }
    };
    return (
        <div>
            <Helmet>
                <title>Instagram | Registration</title>
            </Helmet>
            <div className="container flex justify-center mx-auto items-center h-screen max-w-screen-md ">
                <div className="w-3/5 hidden md:block">
                    <img src=".\images\iphone-with-profile.jpg" alt="iphone-with-profile" />
                </div>
                <div className="flex flex-col w-5/6  md:w-2/5">
                    <div className="flex flex-col border border-gray-border rounded items-center mb-4 p-4 bg-white sm:mx-4">
                        <h1 className="flex justify-center w-full">
                            <img src="./images/logo.png" alt="logo" className="mt-2 w-8/12 mb-4" />
                        </h1>
                        <form onSubmit={submitHandler}>
                            <input
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                                type="text"
                                placeholder="Full Name"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <input
                                value={userName}
                                onChange={({ target }) => setUserName(target.value)}
                                type="text"
                                placeholder="Username"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />

                            <input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                type="email"
                                placeholder="Email"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />

                            <input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <button
                                className="w-full bg-blue text-white font-bold h-8 rounded disabled:opacity-50 flex justify-center items-center"
                                type="submit"
                                disabled={isInvalid}
                            >
                                {loader ? <Spinner /> : 'Signup'}
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-col border border-gray-border rounded items-center mb-4 p-4 bg-white sm:mx-4">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-blue">
                                Signin
                            </Link>
                        </p>
                    </div>
                    {error && (
                        <div className="flex justify-center items-center bg-white p-4 border border-gray-border rounded sm:mx-4">
                            <p className="text-sm text-red-error">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Registration;
