import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  users: {
    1: {
      id: 1,
      firstName: undefined,
      lastName: undefined
    }
  }
};

export default reducer(initialState, {
  [LOAD_USERS]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_USERS_SUCCESS]: (state, action) => {
    const responseUsers = safeGet(action, 'response.body._embedded.users', []);

    const mappedUsers = _(responseUsers).map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }));

    const users = _.object(
      _(mappedUsers).pluck('id'),
      mappedUsers
    );

    return {
      lastUpdate: now(),
      isLoading: false,
      users
    };
  },

  [LOAD_USERS_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
