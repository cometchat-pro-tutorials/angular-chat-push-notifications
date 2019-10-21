// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: 'YOUR-SENDER-ID',
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  const sender = JSON.parse(payload.data.message);
  const notificationTitle = 'New CometChat message';
  const notificationOptions = {
    body: payload.data.alert,
    icon: sender.data.entities.sender.entity.avatar,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
