// CONDITIONS ACTIONS


export const updateCurrentConditions = (conditionsObj) => {
  // console.log('conditionsObj', conditionsObj);
  return (
  {
    type: 'UPDATE_CURRENT_CONDITIONS',
    conditions: conditionsObj,
  }
  )
};