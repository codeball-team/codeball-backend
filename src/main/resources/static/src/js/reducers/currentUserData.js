import { now, reducer, safeGet } from 'utils';
import { LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  currentUser: {
    id: 1,
    firstName: '',
    lastName: '',
    role: 'ROLE_ADMIN'
  }
};

export default reducer(initialState, {
  [LOAD_CURRENT_USER]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_CURRENT_USER_SUCCESS]: (state, action) => {
    const currentUser = safeGet(action, 'response.body', {});

    return {
      lastUpdate: now(),
      isLoading: false,
      currentUser: {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: currentUser.role,
        pictureUrl: currentUser.pictureUrl
      }
    };
  },

  [LOAD_CURRENT_USER_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
