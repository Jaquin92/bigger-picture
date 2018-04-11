import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcoEeSemNul5Ia4WE_sTxJsx9M-ChykTM",
    authDomain: "bigger-picture-7815c.firebaseapp.com",
    databaseURL: "https://bigger-picture-7815c.firebaseio.com",
    projectId: "bigger-picture-7815c",
    storageBucket: "bigger-picture-7815c.appspot.com",
    messagingSenderId: "827336087576"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

