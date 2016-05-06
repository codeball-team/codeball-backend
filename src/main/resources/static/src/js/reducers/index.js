import { combineReducers } from 'redux';
import upcomingMatch from './upcomingMatch';
import users from './users';

const rootReducer = combineReducers({
  upcomingMatch,
  users
});

export default rootReducer;
