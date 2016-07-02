import { ajaxReducer, ajaxReducerInitialState, objectify, safeGet } from 'utils';
import { UserModel } from 'models';
import { USERS_LOAD, USERS_LOAD_FAILURE, USERS_LOAD_SUCCESS } from 'constants/actionTypes';

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
    [USERS_LOAD_SUCCESS]: (state, action) => {
      const responseUsers = safeGet(action, ['response', 'body'], []);
      const mappedUsers = responseUsers.map(UserModel.fromServerFormat);
      const users = objectify(mappedUsers);
      return { ...initialState, users };
    }
  }
);
