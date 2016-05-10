import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import gameData from './gameData';
import usersData from './usersData';

const rootReducer = combineReducers({
  ajaxRequests,
  gameData,
  usersData
});

export default rootReducer;
