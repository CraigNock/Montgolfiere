'use strict';

// const admin = require('firebase-admin');

// require('dotenv').config();
// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: 'service_account',
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//     token_uri: 'https://oauth2.***REMOVED***.com/token',
//     auth_provider_x509_cert_url: 'https://www.***REMOVED***.com/oauth2/v1/certs',
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
//   }),
//   databaseURL: process.env.FB_DATABASE_URL,
// });


//checks the db for the signed in user profile, returns false if doesn't exist yet
//type:GET
const getUserProfile = (req, res) => { 
  const data = (await queryDatabase(`userProfiles`)) || {};
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);

  return dataValue || false;
};


//checks if user profile already exists: if yes sends the google user data, if no add the new user profile data to the db in the 'userProfiles' collection
//type:POST
//receives:google user data
const createUserProfile = async (req, res) => {
  const returningUser = (await getUserProfile(req.body.email));
  console.log(returningUser);

  if (returningUser) {
    res.status(200).json({ 
        status: 200, 
        data: req.body, 
        newUser: false,
        message: 'returning user' ,
      });
    return;
  } else {
    const appUsersRef = db.ref('userProfiles');
    //CHANGE SO INPUTS FULL PROFILE not just google deets (possibly collate in state and sent as req.body instead of the google 'user' bits)
    appUsersRef.push(req.body).then(() => {
      res.status(200).json({
        status: 200,
        data: req.body,
        newUser: false,
        message: 'new user',
      });
    });
  }
};



module.exports = {
  getUserProfile,
  createUserProfile,
};



