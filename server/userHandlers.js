'use strict';

const {startingLocations} = require('./data.js');

const randy = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
  };



const admin = require('firebase-admin');

require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.***REMOVED***.com/token',
    auth_provider_x509_cert_url: 'https://www.***REMOVED***.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = admin.database();


//reusable db query function
const queryDatabase = async (key) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    'value',
    (snapshot) => {data = snapshot.val();},
    (err) => { console.log(err);}
  );
  return data;
};

//checks the db for the signed in user profile, returns false if doesn't exist yet. Maps through subdata to find match for email input
//type:GET
const getUserProfile = async (email) => { 
  const data = (await queryDatabase('userProfiles')) || {};
  //note: data includes db generated key for profile
  // console.log('getuserprofile data ', data); 
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);
  // console.log('dataValue', dataValue);
  return dataValue || false;
};

//checks if user profile already exists: if yes sends the google user data, if no adds the new user profile data to the db in the 'userProfiles' collection
//type:POST
//receives:google user data
const createUserProfile = async (req, res) => {
  console.log('createUserProfile');
  const returningUser = (await getUserProfile(req.body.email));
  // console.log('returningUser ',returningUser);

  if (returningUser) {
    //dispatch currentuserupdate logged in and active?
    res.status(200).json({ 
        status: 200, 
        data: returningUser, 
        newUser: false,
        message: 'returning user' ,
      });
    return;
  } else {
    const userProfilesRef = db.ref('userProfiles');
    const start = startingLocations[randy(0, 10)];

    //pre creates a key in desired node, 
    //can then include this key value in data placed in that location
    const userId = await userProfilesRef.push().key; 

    const newProfile = {
      displayName: req.body.displayName,
      email: req.body.email,
      imageSrc: req.body.photoURL,
      userId: userId,
      location: start.coords,
      elevation: 1,
      // lastActive: null,
      items: [],
      upgrades: [],
      treasureMaps: {},
    
      startingLocation: start,
      startDate: Date.now(),
      friends: [],
      statistics: {},
      collectables: [],
      badges: [],
      achievements: [],
    };
    
    await db.ref('lastVectors/' + userId).set(
      {
        email: req.body.email,
        lastActive: Date.now(),
        lastLocation: start.coords,
        lastBearing: 90,
        lastWindSum: 0,
        lastElevation: 0,
      }
    );
  
  
    db.ref('userProfiles/' + userId).set(newProfile)
      .then(() => {
        res.status(200).json({
          status: 200,
          data: newProfile,
          newUser: true,
          message: 'new user',
        });
      });
  }
};

/////////////////////////////////////////////
//LAST VECTOR 
/////////////////////////////////////////////

// type: GET
const getLastVector = async (req, res) => {
  console.log('getLastVector');
  const { userId } = req.params
  const data = (await queryDatabase('lastVectors/' + userId)) || {};
  res.status(200).json({
    status: 200,
    data: data || false,
  }) 
};

// type: POST
// example lastVector= {
//   email: blah@blah,
//   lastActive: 43423,
//   lastLocation: [44, 44],
//   lastBearing: 230,
//   lastWindSum: 20,
//   lastElevation: 2,
// }

const newLastVector = async (req, res) => {
  // console.log('newLastVector', req.body);
  try {
  await db.ref('lastVectors/' + req.body.userId).set(req.body);
  res.status(204).json({status:204}); //fixed with json (.status doesnt actually send, needs a .send or .json)
  } catch (err) {console.log('err', err);}
};


module.exports = {
  getUserProfile,
  createUserProfile,
  getLastVector,
  newLastVector,
};



