import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBSYtHay3NJ2ggAL02w7aicY9GhLL0Zufg',
  authDomain: 'crwn-db-d1838.firebaseapp.com',
  databaseURL: 'https://crwn-db-d1838.firebaseio.com',
  projectId: 'crwn-db-d1838',
  storageBucket: 'crwn-db-d1838.appspot.com',
  messagingSenderId: '358962601141',
  appId: '1:358962601141:web:53c97c39a6c062960bf2fc',
  measurementId: 'G-K67MF19LLE'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
