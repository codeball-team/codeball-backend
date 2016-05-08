import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import upcomingMatch from './upcomingMatch';
import lastMatch from './lastMatch';
import users from './users';

const rootReducer = combineReducers({
  ajaxRequests,
  upcomingMatch,
  lastMatch,
  users
});

export default rootReducer;
