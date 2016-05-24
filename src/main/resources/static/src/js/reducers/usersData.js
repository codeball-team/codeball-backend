import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { mapUser, userExample } from 'models/user';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  users: {
    [userExample().id]: userExample()
  }
};

export default reducer(initialState, {
  [LOAD_USERS]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_USERS_SUCCESS]: (state, action) => {
    const responseUsers = safeGet(action, 'response.body', []);
    const mappedUsers = _(responseUsers).map(mapUser);
    const users = _.object(
      _(mappedUsers).pluck('id'),
      mappedUsers
    );

    return {
      ...initialState,
      lastUpdate: now(),
      users
    };
  },

  [LOAD_USERS_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
