// Import and initialize the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9JnxPpN4IBlJIwkXF4TcUPJlIU-0LPw0",
  authDomain: "anon-chat-ebfc3.firebaseapp.com",
  databaseURL: "https://anon-chat-ebfc3-default-rtdb.firebaseio.com",
  projectId: "anon-chat-ebfc3",
  storageBucket: "anon-chat-ebfc3.appspot.com",
  messagingSenderId: "555920973157",
  appId: "1:555920973157:web:e98c28b81d901fa41b958c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle incoming messages when the app is in the background
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
