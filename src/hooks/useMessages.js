import { useEffect, useState } from 'react';
import { fireStore } from '../lib/config';

const useMessages = (receiverUId, authUid, collection = 'messages') => {
    const [allMessages, setAllMessages] = useState(null);
    useEffect(() => {
        const unSub = fireStore
            .collection(collection)
            .where('sender', 'in', [receiverUId, authUid])
            .onSnapshot((snap) => {
                const docs = [];
                snap.forEach((item) => {
                    if (
                        (item.data().sender === authUid && item.data().receiver === receiverUId) ||
                        (item.data().sender === receiverUId && item.data().receiver === authUid)
                    ) {
                        docs.push({ ...item.data(), docId: item.id });
                    }
                });

                const sortedMessages = docs.sort((a, b) => b.date - a.date);
                setAllMessages(sortedMessages);
            });
        return () => unSub();
    }, [receiverUId, authUid, collection]);
    return { allMessages };
};

export default useMessages;
