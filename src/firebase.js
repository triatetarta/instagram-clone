import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCp0tec9UJCBcEMxk9kTEAFPkjm0FcZ_s8',
  authDomain: 'instagram-clone-31c8c.firebaseapp.com',
  databaseURL: 'https://instagram-clone-31c8c-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-31c8c',
  storageBucket: 'instagram-clone-31c8c.appspot.com',
  messagingSenderId: '973532828477',
  appId: '1:973532828477:web:2cf2906b393e02513a2b54',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
