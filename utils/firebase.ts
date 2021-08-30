import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8ONxO_Vjxt1HO8DKeoqcsV8ExTUsqof4",
  authDomain: "aperture-479c6.firebaseapp.com",
  databaseURL: "https://aperture-479c6-default-rtdb.firebaseio.com",
  projectId: "aperture-479c6",
  storageBucket: "aperture-479c6.appspot.com",
  messagingSenderId: "407719756458",
  appId: "1:407719756458:web:4421b56d4a0d2168fbc6d3",
  measurementId: "G-JRQ46M1TP5",
};

export const getStorageRef = (userId: number) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const app = firebase.apps[0];

  const storageRef = app.storage().ref(userId.toString());
  return storageRef;
};
