const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.ping = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs! pong", {structuredData: true});
  response.send("pong");
});
