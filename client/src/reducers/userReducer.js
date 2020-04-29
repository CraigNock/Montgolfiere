import produce from 'immer';


const initialState = {
  profile: null,
  active: false,
  loggedIn: false,
};

// const newUserProfile = {
//   displayName: null,
//   email: null,
//   imageSrc: null,
//   id: null,
//   location: [],
//   elevation: 2,

///important, calc travel on re active(update on burn or location update?)
//   lastActive: null, 

//   items: [],
//   upgrades: [],
//   treasureMaps: {},

//   startingLocation: {},
//   friends: [],
//   statistics: {},
//   collectables: [],
//   badges: [],
//   achievements: [],
// };


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-CURRENT-USER': {
      // console.log('actionuser', action);
      // console.log('stateuser', state);
      return produce(state, draftState => {
        draftState.profile = action.user;
        draftState.active = true;
        draftState.loggedIn = true;
      });
    };
    case 'UPDATE-LOCATION': {
      // console.log('state.profile', state.profile);
      // console.log('action.newLocation', action.newLocation);
      return produce(state, draftState => {
        draftState.profile.location = action.newLocation;
      });
    };
    default:
      return state ;
  }
};



export default userReducer;