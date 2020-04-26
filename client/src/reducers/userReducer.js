import produce from 'immer';


const initialState = {
  profile: null,
  active: false,
  loggedIn: false,
};

const newUserProfile = {
  displayName: null,
  email: null,
  imageSrc: null,
  id: null,
  location: [],
  lastActive: null,
  items: [],
  upgrades: [],
  treasureMaps: {},

  startingLocation: {},
  friends: [],
  statistics: {},
  collectables: [],
  badges: [],
  achievements: [],
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-CURRENT-USER': {
      return produce(state, draftState => {
        draftState.profile = action.user;
      });
    };
    default:
      return { 
        state 
      };
  }
};



export default userReducer;