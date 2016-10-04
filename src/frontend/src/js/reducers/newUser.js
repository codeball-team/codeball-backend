import { reducer } from 'utils';
import {
  NEW_USER_CHANGE_EMAIL,
  NEW_USER_CHANGE_FIRST_NAME,
  NEW_USER_CHANGE_LAST_NAME,
  NEW_USER_CHANGE_ROLE,
  NEW_USER_RESET
} from 'constants/actionTypes';
import { NewUserModel } from 'models';

const initialState = new NewUserModel();

export default reducer(initialState, {
  [NEW_USER_CHANGE_EMAIL]: (state, action) => {
    const { email } = action;

    return {
      ...state,
      email
    };
  },

  [NEW_USER_CHANGE_FIRST_NAME]: (state, action) => {
    const { firstName } = action;

    return {
      ...state,
      firstName
    };
  },

  [NEW_USER_CHANGE_LAST_NAME]: (state, action) => {
    const { lastName } = action;

    return {
      ...state,
      lastName
    };
  },

  [NEW_USER_CHANGE_ROLE]: (state, action) => {
    const { role } = action;

    return {
      ...state,
      role
    };
  },

  [NEW_USER_RESET]: () => initialState
});
