import produce from 'immer';


const initialState = {
  status: 'awaiting signin'
};
//status'= 'awaiting signin' , 'loading' , 'logged in'

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS_WAITING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'awaiting signin';
      });
    case 'SET_STATUS_LOADING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'loading';
      });
    case 'SET_STATUS_LOGGED':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'logged in';
      });
  
    default:
      return state ;
  }
};



export default appReducer;