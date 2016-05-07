import { combineReducers } from 'redux';
import ajaxRequests from './ajaxRequests';
import upcomingMatch from './upcomingMatch';
import users from './users';

const rootReducer = combineReducers({
  ajaxRequests,
  upcomingMatch,
  users
});

export default rootReducer;
