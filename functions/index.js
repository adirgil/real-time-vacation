const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.ping = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs! pong", {structuredData: true});
  response.send("pong");
});

exports.generateCreated = functions.database.ref('/deals/{dealId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
        console.log(original)
        const today = new Date()
        const strCreated = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() + " " + today.getHours()
        + ":" + today.getMinutes() + ":" + today.getSeconds()
        // return snapshot.ref.update({createdOn: new String(new Date())})
        return snapshot.ref.update({createdOn: strCreated})
    });

