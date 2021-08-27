const functions = require("firebase-functions");
import * as functions from "firebase-functions";
const universal = require(`${process.cwd()}/dist/server`).app;

export const ssr = functions.https.onRequest(universal);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
