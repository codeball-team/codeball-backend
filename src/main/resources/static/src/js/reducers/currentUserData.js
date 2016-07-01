import { reducer, safeGet } from 'utils';
import { mapUser, userExample } from 'models/user';
import {
  CURRENT_USER_LOAD, CURRENT_USER_LOAD_FAILURE, CURRENT_USER_LOAD_SUCCESS
} from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  currentUser: userExample()
};

export default reducer(initialState, {
  [CURRENT_USER_LOAD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [CURRENT_USER_LOAD_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [CURRENT_USER_LOAD_SUCCESS]: (state, action) => {
    const { time: lastUpdate } = action;
    const responseUser = safeGet(action, 'response.body', {});
    const currentUser = mapUser(responseUser);

    return {
      ...initialState,
      lastUpdate,
      currentUser
    };
  }
});
