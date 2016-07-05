import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ajaxRequests from './ajaxRequests';
import currentUserData from './currentUserData';
import gameData from './gameData';
import gamesData from './gamesData';
import newGame from './newGame';
import newPitch from './newPitch';
import newPlayer from './newPlayer';
import pitchesData from './pitchesData';
import usersData from './usersData';

const rootReducer = combineReducers({
  ajaxRequests,
  currentUserData,
  gameData,
  gamesData,
  newGame,
  newPitch,
  newPlayer,
  pitchesData,
  usersData,
  routing: routerReducer
});

export default rootReducer;
