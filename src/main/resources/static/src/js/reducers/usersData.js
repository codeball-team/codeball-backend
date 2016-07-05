import { ajaxReducer, ajaxReducerInitialState, objectify, safeGet } from 'utils';
import { UserModel } from 'models';
import {
  NEW_PLAYER_SUBMIT_SUCCESS,
  USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  ...ajaxReducerInitialState,
  users: {
    [UserModel.example().id]: UserModel.example()
  }
};

export default ajaxReducer(
  initialState,
  {
    startAction: USERS_LOAD,
    failureAction: USERS_LOAD_FAILURE,
    successAction: USERS_LOAD_SUCCESS
  },
  {
    [NEW_PLAYER_SUBMIT_SUCCESS]: (state, action) => {
      const responseUser = safeGet(action, ['response', 'body'], {});
      const mappedUser = UserModel.fromServerFormat(responseUser);
      const { id } = mappedUser;

      return {
        ...state,
        users: {
          ...state.users,
          [id]: mappedUser
        }
      };
    },

    [USERS_LOAD_SUCCESS]: (state, action) => {
      const responseUsers = safeGet(action, ['response', 'body'], []);
      const mappedUsers = responseUsers.map(UserModel.fromServerFormat);
      const users = objectify(mappedUsers);
      return { ...initialState, users };
    }
  }
);
