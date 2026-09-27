importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyCw26YflI9oPAxNi6_cTiXi5fYhqPgRqC0',
    authDomain: 'marakish-shj.firebaseapp.com',
    projectId: 'marakish-shj',
    storageBucket: 'marakish-shj.firebasestorage.app',
    messagingSenderId: '412768967356',
    appId: '1:412768967356:web:bb5fd4c30c39e4673a4eb9',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
