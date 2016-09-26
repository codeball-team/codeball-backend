import { ajaxReducer } from 'utils';
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
      const { response } = action;
      const user = UserModel.fromServerFormat(response);
      const { id: userId } = user;
      const currentUsers = state.users;
      const userIndex = currentUsers.findIndex(({ id }) => id === userId);

      return {
        ...state,
        users: [
          ...state.users.slice(0, userIndex),
          user,
          ...state.users.slice(userIndex + 1)
        ]
      };
    },

    [NEW_USER_SUBMIT_SUCCESS]: (state, action) => {
      const { response } = action;
      const user = UserModel.fromServerFormat(response);

      return {
        ...state,
        users: [
          ...state.users,
          user
        ]
      };
    },

    [USERS_LOAD_SUCCESS]: (state, action) => {
      const { response = [] } = action;
      const users = response.map(UserModel.fromServerFormat);

      return {
        ...initialState,
        users
      };
    }
  }
);
