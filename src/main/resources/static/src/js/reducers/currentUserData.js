import { now, reducer, safeGet } from 'utils';
import { mapUser, userExample } from 'models/user';
import { LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  currentUser: userExample()
};

export default reducer(initialState, {
  [LOAD_CURRENT_USER]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_CURRENT_USER_SUCCESS]: (state, action) => {
    const responseUser = safeGet(action, 'response.body', {});
    const currentUser = mapUser(responseUser);

    return {
      lastUpdate: now(),
      isLoading: false,
      currentUser
    };
  },

  [LOAD_CURRENT_USER_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
