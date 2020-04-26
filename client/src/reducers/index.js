import { combineReducers } from 'redux';

import app from './appReducer';
import conditions from './conditionsReducer';
import user from './userReducer';

//ie state.app, state.conditions, state.user
export default combineReducers({ app, conditions, user, });