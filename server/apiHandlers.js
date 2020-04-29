'use strict';

const request = require('request-promise');
// const opencage = require('opencage-api-client');
const moment = require('moment-timezone');

const {startingLocations} = require('./data.js');

const randy = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
  };


require('dotenv').config();


const darkGet = async (lat, long) => {
  try{
    //units=si gives windspeed in m/s, units=ca gives kph
    let darkData = await request(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?units=ca&exclude=minutely,daily,alerts,flags`);
    darkData = JSON.parse(darkData);
    // console.log('darkdata', darkData);
    return darkData;
  } catch(err) {console.log('error', err)}
};
const getConditions = async (req, res) => {
  let position = req.body.currentPosition;
  // console.log('position ',position);
  let lat = position[0];
  let long = position[1];
  let conditions = await darkGet(lat, long);
  let timey = moment.unix(conditions.currently.time).tz(conditions.timezone).format('ha z');
  // console.log('timey ', timey);
  conditions.currently.time = timey;
  let windSum = (conditions.currently.windGust - conditions.currently.windSpeed)/2 + conditions.currently.windSpeed;
  conditions.currently.windSum = windSum;
  res.status(200).send({
    status:'200',
    conditions:conditions,
  })

};

const getAddressPosition = async () => {
//maybe?
};


module.exports = {
  getConditions,
  getAddressPosition,
};



