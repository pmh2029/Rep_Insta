import { FieldValue, fireStore } from '../lib/config';

export const checkExistingUserName = async (username) => {
    const result = await fireStore.collection('users').where('username', '==', username).get();
    if (result.empty) {
        return true;
    }
    return false;
};

export const getUserByUid = async (uid) => {
    const resultRef = await fireStore.collection('users').where('uid', '==', uid).get();

    return resultRef.docs.map((snapShoot) => {
        const docId = snapShoot.id;
        const data = snapShoot.data();
        return { ...data, docId };
    })[0];
};

export const getSuggestedUsers = async (userUid, following, limit = 10) => {
    const collectionRef = fireStore.collection('users');
    if (following.length === 0) {
        const suggested = await collectionRef.where('uid', '!=', userUid).get();
        if (suggested.empty) {
            return [];
        }
        return suggested.docs.map((item) => ({ ...item.data(), docId: item.id }));
    }
    const suggested = await collectionRef.get();
    if (suggested.empty) {
        return [];
    }
    const result = suggested.docs.map((item) => ({ ...item.data(), docId: item.id }));
    const filtered = result
        .filter((item) => ![...following, userUid].includes(item.uid))
        .slice(0, limit);
    return filtered;
};

export const updateLoggedInUserFollowing = (loggedInDocId, targetDocId, isFollowing) => {
    fireStore
        .collection('users')
        .doc(loggedInDocId)
        .update({
            following: isFollowing
                ? FieldValue.arrayRemove(targetDocId)
                : FieldValue.arrayUnion(targetDocId),
        });
};

export const updateFollowingUsersFollowers = (targetDocId, loggedInUId, isFollowers) => {
    fireStore
        .collection('users')
        .doc(targetDocId)
        .update({
            followers: isFollowers
                ? FieldValue.arrayRemove(loggedInUId)
                : FieldValue.arrayUnion(loggedInUId),
        });
};

export const getFollowingPost = async (following, userUId) => {
    const idIncludesMe = [...following, userUId];
    const result = await fireStore.collection('photos').get();
    if (result.empty) {
        return [];
    }

    const photoResult = result.docs.map((photo) => ({
        ...photo.data(),
        photoDocId: photo.id,
    }));

    const photoFilter = photoResult.filter((item) => idIncludesMe.includes(item.userUId));
    const photosWithDetails = await Promise.all(
        photoFilter.map(async (photo) => {
            let userLiked = false;
            if (photo.likes.includes(userUId)) {
                userLiked = true;
            }
            const user = await getUserByUid(photo.userUId);
            const { username, photo: avatar } = user;
            return { ...photo, username, avatar, userLiked };
        })
    );

    return photosWithDetails;
};

export const getUserByUserName = async (userName) => {
    const userRef = await fireStore.collection('users').where('username', '==', userName).get();
    if (userRef.empty) {
        return null;
    }
    const result = userRef.docs.map((item) => ({ ...item.data(), userDocId: item.id }))[0];
    return result;
};

export const getUserPhotosByUId = async (userUId) => {
    const photosRef = await fireStore.collection('photos').where('userUId', '==', userUId).get();
    if (photosRef.empty) {
        return [];
    }
    const result = photosRef.docs.map((photo) => ({ ...photo.data(), photoDocId: photo.id }));
    return result;
};

export const getFollowingUsersInfo = async (following) => {
    const usersRef = await fireStore.collection('users').get();
    if (usersRef.empty || !following.length) {
        return [];
    }
    const result = usersRef.docs.map((item) => ({ ...item.data(), userDocId: item.id }));
    const filtered = result.filter((item) => following.includes(item.uid));
    return filtered;
};
