import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/context';
import { fireStore } from '../lib/config';

const useUser = (collection = 'users') => {
    const [activeUser, setActiveUser] = useState({});
    const {
        loggedInUser: { uid },
    } = useContext(UserContext);

    useEffect(() => {
        const unSub = fireStore
            .collection(collection)
            .where('uid', '==', uid)
            .onSnapshot((snap) => {
                const docs = [];
                snap.forEach((item) => {
                    docs.push({ ...item.data(), docId: item.id });
                });
                setActiveUser(docs[0]);
            });
        return unSub;
    }, [collection, uid]);
    return { user: activeUser };
};

export default useUser;
