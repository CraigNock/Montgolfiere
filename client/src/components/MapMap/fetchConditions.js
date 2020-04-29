import React from 'react';


const fetchConditions = (position) => {

  let currentPosition = [...position];
  // console.log('position at fetch ', currentPosition);
  return(
    fetch('/api/conditions', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
      },
      body:JSON.stringify({currentPosition})
    })
      .then(data => data.json())
      .then(data => {
        // console.log('fetched conditions ', data.conditions.currently);
        // console.log('windSpeed ', data.conditions.currently.windSpeed);
        let currentConditions = data.conditions.currently;
        return currentConditions;
      })
  )
};


export default fetchConditions;