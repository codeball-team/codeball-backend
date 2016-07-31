import { ajaxReducer, ajaxReducerInitialState, safeGet, sortByMany } from 'utils';
import {
  NEW_USER_SUBMIT_SUCCESS,
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/actionTypes';
import { UserModel } from 'models';

const initialState = {
  ...ajaxReducerInitialState,
  users: []
};

export default ajaxReducer(
  initialState,
  {
    startAction: USERS_LOAD,
    failureAction: USERS_LOAD_FAILURE,
    successAction: USERS_LOAD_SUCCESS
  },
  {
    [NEW_USER_SUBMIT_SUCCESS]: (state, action) => {
      const responseUser = safeGet(action, ['response', 'body'], {});
      const mappedUser = UserModel.fromServerFormat(responseUser);

      return {
        ...state,
        users: [
          ...state.users,
          mappedUser
        ]
      };
    },

    [USERS_LOAD_SUCCESS]: (state, action) => {
      const responseUsers = safeGet(action, ['response', 'body'], []);
      const mappedUsers = responseUsers.map(UserModel.fromServerFormat);
      const sortedUsers = sortByMany(mappedUsers, ['lastName', 'firstName']);

      return {
        ...initialState,
        users: sortedUsers
      };
    }
  }
);
