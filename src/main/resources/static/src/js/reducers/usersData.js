import _ from 'underscore';
import { objectify, reducer, safeGet } from 'utils';
import { mapUser, userExample } from 'models/user';
import {
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  users: {
    [userExample().id]: userExample()
  }
};

export default reducer(initialState, {
  [USERS_LOAD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [USERS_LOAD_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [USERS_LOAD_SUCCESS]: (state, action) => {
    const { time: lastUpdate } = action;
    const responseUsers = safeGet(action, 'response.body', []);
    const mappedUsers = _(responseUsers).map(mapUser);
    const users = objectify(mappedUsers);

    return {
      ...initialState,
      lastUpdate,
      users
    };
  }
});
