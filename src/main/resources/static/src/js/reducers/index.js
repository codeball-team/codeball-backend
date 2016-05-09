import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import game from './game';
import lastMatch from './lastMatch';
import users from './users';

const rootReducer = combineReducers({
  ajaxRequests,
  game,
  lastMatch,
  users
});

export default rootReducer;
