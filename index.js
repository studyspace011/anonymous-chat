const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendChatNotifications = functions.database.ref('/messages/{messageId}')
    .onCreate((snapshot, context) => {
        // The message data that was just added
        const messageData = snapshot.val();
        const senderUsername = messageData.user;
        const messageText = messageData.message;

        // Notification payload
        const payload = {
            notification: {
                title: `New message from ${senderUsername}`,
                body: messageText,
                icon: '/icons/icon-192x192.png' // Your app icon
            }
        };

        // Get the list of all device tokens.
        return admin.database().ref('/fcmTokens').once('value').then(allTokens => {
            if (allTokens.exists()) {
                const tokens = [];
                // Iterate through all tokens
                allTokens.forEach(tokenSnapshot => {
                    const tokenUser = tokenSnapshot.key;
                    // Don't send notification to the message sender
                    if (tokenUser !== senderUsername) {
                        tokens.push(tokenSnapshot.val());
                    }
                });

                if (tokens.length > 0) {
                    // Send notifications to all tokens.
                    return admin.messaging().sendToDevice(tokens, payload);
                }
            }
            return null;
        });
    });