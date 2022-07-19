import React, { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
import { MdArrowBack } from 'react-icons/md';
import { Link, useHistory} from 'react-router-dom';
import { fireAuth, fireStore } from '../../lib/config';
import { checkExistingUserName } from '../../services/services';
import useUser from '../../hooks/useUser';
// import DeleteUsers from '../DeleteUsers';

const Admin = () => {
    const { user } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const isInvalid = email === '' || password === '' || userName === '' || fullName === '';

    const history = useHistory();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isShow1, setisShow1] = useState(true);
    const previousUser = user;
    // const [isShow2, setisShow2] = useState(true);
    // const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        // const getAllProfiles = async () => {
        //     const profiles = await getSuggestedUsers(user.uid, user.following, 20);
        //     setUserProfiles(profiles);
        //     console.log(userProfiles);
        // };
        // if (user.uid) {
        //     getAllProfiles();
        // }
    }, [user, history, user.adminState]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        const isNameAvailable = await checkExistingUserName(userName);
        if (isNameAvailable) {
            try {
                const createdResult = await fireAuth.createUserWithEmailAndPassword(
                    email,
                    password
                );
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
                fireAuth.signOut();
                fireAuth.signInWithEmailAndPassword(previousUser.email, authPassword);
                setSuccess("User created successfully!");
            } catch (err) {
                setError(err.message);
                setUserName('');
                setFullName('');
                setEmail('');
                setPassword('');
            }
        } else {
            setUserName('');
            setError('Username already Exists! Try a different Username...');
        }
    };

    // const handleDeleteUser = async (e) => {
    //     e.preventDefault();
    //     setLoader(true);
    //     const users = await getAllUsers();

    //     if (users) {
    //         try {
    //             const createdResult = await fireAuth.createUserWithEmailAndPassword(
    //                 email,
    //                 password
    //             );
    //             await createdResult.user.updateProfile({
    //                 displayName: fullName,
    //             });
    //             await fireStore.collection('users').add({
    //                 uid: createdResult.user.uid,
    //                 username: userName.toLowerCase(),
    //                 displayName: fullName,
    //                 email: email.toLowerCase(),
    //                 following: [],
    //                 followers: [],
    //                 photo: '',
    //                 dateCreated: Date.now(),
    //             });
    //             setLoader(false);
    //         } catch (err) {
    //             setLoader(false);
    //             setError(err.message);
    //             setUserName('');
    //             setFullName('');
    //             setEmail('');
    //             setPassword('');
    //         }
    //     } else {
    //         setLoader(false);
    //         setUserName('');
    //         setError('Username already Exists! Try a different Username...');
    //     }
    // };

    return (

        <div className="d-flex flex-column bd-highlight mb-3">
            <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg  my-12 mt-24 bg-white border border-gray-border p-4 h-max rounded">
                <div className="flex items-center  mb-6">
                    <button type="button" className="text-blue font-2xl">
                        <Link to={`/${user.username}`}>
                            <MdArrowBack size={25} />
                        </Link>
                    </button>
                    <h1 className="font-2xl flex-1  font-bold text-black-icon  text-center">
                        Add User
                    </h1>
                </div>
                {isShow1&&user.adminState ? (
                    <div className="flex flex-col space-y-4">
                        <form onSubmit={handleAddUser}>
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
                            <input
                                value={authPassword}
                                onChange={({ target }) => setAuthPassword(target.value)}
                                type="password"
                                placeholder="Enter Your Password To Make Change"
                                className="w-full mb-2 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-text focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <button
                                className="w-full bg-blue text-white font-bold h-8 rounded disabled:opacity-50 flex justify-center items-center"
                                type="submit"
                                disabled={isInvalid}
                            >
                            Add User
                            </button>
                        </form>
                        {success && <div className="my-3 text-center text-blue">{success}</div>}
                        {error && <div className="my-3 text-center text-red-error">{error}</div>}
                    </div>
                ) : null}
                
                <button 
                type="button" 
                className="text-blue font-2xl"
                    onClick={() => setisShow1(!isShow1)}
                >Hide/Expand</button>
            </div>

            {/* <div className="container mx-auto md:max-w-screen-md  lg:max-w-screen-lg  my-12 mt-24 bg-white border border-gray-border p-4 h-max rounded">
                <div className="flex items-center  mb-6">
                    <button type="button" className="text-blue font-2xl">
                        <Link to={`/${user.username}`}>
                            <MdArrowBack size={25} />
                        </Link>
                    </button>
                    <h1 className="font-2xl flex-1  font-bold text-black-icon  text-center">
                        Delete User
                    </h1>
                </div>
                {isShow2&&user.adminState ? (
                <div className="container mx-auto  max-w-screen-md  mt-24  flex justify-center">
                    <div className="w-w/6  sm:w-4/6  bg-white ">
                        {userProfiles.length !== 0 ? (
                            userProfiles.map((item) => (
                                <DeleteUsers
                                    key={item.docId}
                                    user={item}
                                />
                            ))
                        )
                        : (
                            <div className="flex justify-between items-center p-2 px-8 mb-1">
                                <Skeleton count={20} width={300} height={80} />
                            </div>
                        )}
                        </div>
                    </div>
                    ): null}
                    <button 
                    type="button" 
                    className="text-blue font-2xl"
                        onClick={() => setisShow2(!isShow2)}
                    >Hide/Expand</button>
            </div> */}
        </div>
    );
};

export default Admin;
