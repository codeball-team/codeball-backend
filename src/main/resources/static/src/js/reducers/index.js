import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import game from './game';
import users from './users';

const rootReducer = combineReducers({
  ajaxRequests,
  game,
  users
});

export default rootReducer;
