// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {

  apiKey: "AIzaSyDObscnzlXxOCvyBsDMdXycZOK6_-xSAcM",

  authDomain: "sfx-heatmap-f8c23.firebaseapp.com",

  projectId: "sfx-heatmap-f8c23",

  storageBucket: "sfx-heatmap-f8c23.firebasestorage.app",

  messagingSenderId: "106607280267",

  appId: "1:106607280267:web:8fccac1389626726c0148e"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);

const db = getFirestore(app);

const realtimeDB = getDatabase(app);

// Export Firebase
export {
  app,
  auth,
  db,
  realtimeDB
};
