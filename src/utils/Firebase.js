import firebase from 'firebase/app';
require("firebase/database");

const config = {
  databaseURL: "https://hacker-news.firebaseio.com/",
};

export default firebase.initializeApp(config);;