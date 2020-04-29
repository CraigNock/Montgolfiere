// CONDITIONS ACTIONS


export const updateCurrentConditions = (conditionsObj) => {
  // console.log('conditionsObj', conditionsObj);
  return (
  {
    type: 'UPDATE-CURRENT-CONDITIONS',
    conditions: conditionsObj,
  }
  )
};