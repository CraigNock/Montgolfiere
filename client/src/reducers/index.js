import { combineReducers } from 'redux';

import appReducer from './appReducer';
import conditionsReducer from './conditionsReducer';



export default combineReducers({ appReducer, conditionsReducer, });