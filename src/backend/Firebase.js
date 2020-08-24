const config = {
    apiKey: "AIzaSyB4f3LV4TOHusLkj4EnaGG_95Do0C9Q6IA",
    authDomain: "lets-hang-out-6f3e2.firebaseapp.com",
    databaseURL: "https://lets-hang-out-6f3e2.firebaseio.com",
    projectId: "lets-hang-out-6f3e2",
    storageBucket: "lets-hang-out-6f3e2.appspot.com",
    messagingSenderId: "462346163981",
    appId: "1:462346163981:web:474157a7aca0749cc6c244",
};

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
