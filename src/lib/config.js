/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {
	apiKey,
	appId,
	authDomain,
	messagingSenderId,
	projectId,
	storageBucket
} from './variables';

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireStorage = firebase.storage();
const fireAuth = firebase.auth();
const { FieldValue } = firebase.firestore;
const Timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { fireStore, fireAuth, fireStorage, FieldValue, Timestamp };

