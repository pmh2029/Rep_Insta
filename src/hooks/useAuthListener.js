import { useEffect, useState } from 'react';
import { fireAuth } from '../lib/config';

const useAuthListener = () => {
    const userInfo = localStorage.getItem('instaUser')
        ? JSON.parse(localStorage.getItem('instaUser'))
        : null;
    const [loggedInUser, setLoggedInUser] = useState(userInfo);
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem('instaUser', JSON.stringify(authUser));
                setLoggedInUser(authUser);
            } else {
                localStorage.removeItem('instaUser');
            }
        });
        return () => unsubscribe();
    }, []);
    return { loggedInUser };
};

export default useAuthListener;
