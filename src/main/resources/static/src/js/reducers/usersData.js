import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  users: {
    1: {
      id: 1,
      firstName: '',
      lastName: '',
      role: 'ROLE_ADMIN'
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
    const users = safeGet(action, 'response.body', []);

    const mappedUsers = _(users).map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      pictureUrl: user.pictureUrl
    }));

    return {
      lastUpdate: now(),
      isLoading: false,
      users: _.object(
        _(mappedUsers).pluck('id'),
        mappedUsers
      )
    };
  },

  [LOAD_USERS_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
