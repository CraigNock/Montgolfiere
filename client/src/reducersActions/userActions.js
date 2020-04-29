// USER ACTIONS


export const updateCurrentUser = (userObj) => (
  {
    type: 'UPDATE-CURRENT-USER',
    user: userObj,
  }
);
export const updateLocation = (newLocation) => (
  {
    type: 'UPDATE-LOCATION',
    newLocation,
  }
);

