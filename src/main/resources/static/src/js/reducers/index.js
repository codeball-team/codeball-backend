import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import gameData from './gameData';
import pitchesData from './pitchesData';
import usersData from './usersData';
import currentUserData from './currentUserData';

const rootReducer = combineReducers({
  ajaxRequests,
  gameData,
  pitchesData,
  usersData,
  currentUserData
});

export default rootReducer;
