// CONDITIONS ACTIONS


export const updateCurrentConditions = (conditionsObj) => {
  // console.log('conditionsObj', conditionsObj);
  return ({
    type: 'UPDATE_CURRENT_CONDITIONS',
    conditions: conditionsObj,
  })
};
export const updateNearestCity = (newNearestCity) => {
  // console.log('newNearestCity', newNearestCity);
  return ({
    type: 'UPDATE_NEAREST_CITY',
    nearestCity: newNearestCity,
  })
};


