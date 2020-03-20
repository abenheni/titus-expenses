import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCmtgLpbjH3UqkYLU1d25e-XUxChCdNVrA",
    authDomain: "titusexpenses.firebaseapp.com",
    databaseURL: "https://titusexpenses.firebaseio.com",
  }
firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();