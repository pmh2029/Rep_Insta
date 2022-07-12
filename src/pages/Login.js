import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { fireAuth } from '../lib/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const isInvalid = email === '' || password === '';

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            await fireAuth.signInWithEmailAndPassword(email, password);
            setLoader(false);
            history.push('/');
        } catch (err) {
            setLoader(false);
            setPassword('');
            setEmail('');
            setError(err.message);
        }
    };
    return (
        <div>
            <Helmet>
                <title>Instagram | Login</title>
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
                                aria-label="Enter your email address"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                type="email"
                                placeholder="Email"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <button
                                className="w-full bg-blue text-white font-bold h-8 rounded disabled:opacity-50 flex justify-center items-center"
                                type="submit"
                                disabled={isInvalid}
                            >
                                {loader ? <Spinner /> : 'Login'}
                            </button>
                        </form>
                    </div>
                    <div className="flex justify-center items-center bg-white p-4 mb-4 border border-gray-border rounded  sm:mx-4 ">
                        <p className="text-sm">
                            Don&apos;t have an account?{' '}
                            <Link to="/registration" className="font-bold text-blue">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    {error && (
                        <div className="flex justify-center items-center bg-white p-4 border border-gray-border rounded sm:mx-4 mt-3">
                            <p className="text-sm text-red-error">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
