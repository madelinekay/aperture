import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const auth = firebase.auth();
auth.onAuthStateChanged((user) => {
  // Check for user status
});
