import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../reducersActions/userActions';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';


export const AuthContext = createContext(null);
  

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    databaseURL: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***",
    appId: "1:***REMOVED***:web:***REMOVED***"
  };

//initializes firebase app
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firebaseAppAuth = firebaseApp.auth();

//sign in methods (can add others later)
  const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };


// {signInWithGoogle, signOut, user} are provided/imported with firebase
const AuthProvider = ({ children, signInWithGoogle, signOut, user }) => { 
  const [currentUser, setCurrentUser] = useState({}); //replace with redux state
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    setCurrentUser({});
  };

//if someone signs in with google (user changes) then check if user exists on db, if not then add to db and set currentUser to that user data
  useEffect(() => {
    if (user) {
      fetch('/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('json.data', json.data);
          setCurrentUser(json.data);
          dispatch(updateCurrentUser(json.data));
        });
    }
// eslint-disable-next-line
  }, [user])



  return (
    <AuthContext.Provider 
      value={{ currentUser, signInWithGoogle, handleSignOut }}
    > 
      { children }
    </AuthContext.Provider> 
  ) 
}; 




export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AuthProvider);



