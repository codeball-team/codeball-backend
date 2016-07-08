import { ajaxReducer, ajaxReducerInitialState, safeGet } from 'utils';
import { UserModel } from 'models';
import { CURRENT_USER_LOAD, CURRENT_USER_LOAD_FAILURE, CURRENT_USER_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  ...ajaxReducerInitialState,
  currentUser: new UserModel()
};

export default ajaxReducer(
  initialState,
  {
    startAction: CURRENT_USER_LOAD,
    failureAction: CURRENT_USER_LOAD_FAILURE,
    successAction: CURRENT_USER_LOAD_SUCCESS
  },
  {
    [CURRENT_USER_LOAD_SUCCESS]: (state, action) => {
      const responseUser = safeGet(action, ['response', 'body'], {});
      const currentUser = UserModel.fromServerFormat(responseUser);
      return { ...initialState, currentUser };
    }
  }
);
