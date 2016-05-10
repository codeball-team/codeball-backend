import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import gameData from './gameData';
import pitchesData from './pitchesData';
import usersData from './usersData';

const rootReducer = combineReducers({
  ajaxRequests,
  gameData,
  pitchesData,
  usersData
});

export default rootReducer;
