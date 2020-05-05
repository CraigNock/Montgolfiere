import produce from 'immer';


const initialState = {
  appStatus: 'awaiting signin',
  lens: true,
  viewRange: 1,
};
//status'= 'awaiting signin' , 'loading' , 'logged in'
//viewRange = 'global', 'radius', 'local'

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS_WAITING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'awaiting signin';
      });
    case 'SET_STATUS_LOADING':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'loading';
      });
    case 'SET_STATUS_LOGGED':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.appStatus = 'logged in';
      });
    case 'TOGGLE_LENS':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.lens = !state.lens;
      });
    case 'SET_VIEW_RANGE':
      // console.log('stateAPP', state);
      return produce(state, draftState => {
        draftState.viewRange = action.view;
      });
    default:
      return state ;
  }
};



export default appReducer;