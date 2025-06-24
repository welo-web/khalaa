importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyABKy0bqsaKFurISkI9sKySNuIZ6vbiGgw",
  authDomain: "khalaa-plateform.firebaseapp.com",
  projectId: "khalaa-plateform",
  storageBucket: "khalaa-plateform.firebasestorage.app",
  messagingSenderId: "124801421661",
  appId: "1:124801421661:web:d532597df01fda027c58b4",
  measurementId: "G-E7550TWRZ5"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});