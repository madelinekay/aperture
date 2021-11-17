import firebase from 'firebase'

const auth = firebase.auth();
auth.onAuthStateChanged((user) => {
  // Check for user status
});
