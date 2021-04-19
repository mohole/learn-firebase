import firebase from 'firebase/app';
import 'firebase/firestore';

/** 
 * Check if an environment variable exists
 * @param {string} key environment variable key name
 * @returns {string} value of the key or an empy string
 */
const ENV = (key) => process.env[key] || '';

/**
 * Firebase Config Object
 */
const firebaseConfig = {
  // apiKey: ENV('REACT_APP_APIKEY'),
  // authDomain: ENV('REACT_APP_AUTHDOMAIN'),
  projectId: ENV('REACT_APP_PROJECTID'),
  // storageBucket: ENV('REACT_APP_PROJECTID') + ".appspot.com",
  // messagingSenderId: ENV('REACT_APP_MESSAGESENDERID'),
  appId: ENV('REACT_APP_ID'),
  // measurementId: ENV('REACT_APP_MEASUREMENTID')
};

/** Initialize Firebase */
firebase.initializeApp(firebaseConfig);

export default firebase;