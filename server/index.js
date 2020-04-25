'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { getUserProfile, createUserProfile } = require('./handlers');


const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  // present by default
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // don't need a sign in as googleSignIn is a method in firebase(unless you build your own)
  // endpoints
  .get('/getuser', getUserProfile)
  .post('/createuser', createUserProfile)





  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
