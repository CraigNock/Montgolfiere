import produce from 'immer';


const initialState = {
  status: 'awaiting signin'
};
//status'= 'awaiting signin' , 'loading' , 'logged in'

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-STATUS-WAITING':{
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'awaiting signin';
      });
    };
    case 'SET-STATUS-LOADING':{
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'loading';
      });
    };
    case 'SET-STATUS-LOGGED':{
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.status = 'logged in';
      });
    };
  
    default:
      return state ;
  }
};



export default appReducer;