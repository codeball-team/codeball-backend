import { ajaxReducer } from 'utils';
import {
  CURRENT_USER_LOAD,
  NEW_USER_SUBMIT,
  USERS_LOAD
} from 'constants/actionTypes';
import { UserModel } from 'models';

const initialState = {
  users: []
};

export default ajaxReducer(initialState, USERS_LOAD, {
  [CURRENT_USER_LOAD.SUCCESS]: (state, action) => {
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

  [NEW_USER_SUBMIT.SUCCESS]: (state, action) => {
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

  [USERS_LOAD.SUCCESS]: (state, action) => {
    const { response = [] } = action;
    const users = response.map(UserModel.fromServerFormat);

    return {
      ...initialState,
      users
    };
  }
});
