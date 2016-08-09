import { ajaxReducer, safeGet, sortByMany } from 'utils';
import {
  CURRENT_USER_LOAD_SUCCESS, NEW_USER_SUBMIT_SUCCESS,
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/actionTypes';
import { UserModel } from 'models';

const initialState = {
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
    [CURRENT_USER_LOAD_SUCCESS]: (state, action) => {
      const responseUser = safeGet(action, ['response', 'body'], {});
      const mappedUser = UserModel.fromServerFormat(responseUser);
      const { id: userId } = responseUser;
      const currentUsers = state.users;
      const userIndex = currentUsers.findIndex(({ id }) => id === userId);

      return {
        ...state,
        users: [
          ...state.users.slice(0, userIndex),
          mappedUser,
          ...state.users.slice(userIndex + 1)
        ]
      };
    },

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
