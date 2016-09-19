import { ajaxReducer, safeGet } from 'utils';
import { UserModel } from 'models';
import { USER_LOAD, USER_LOAD_FAILURE, USER_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  user: new UserModel()
};

export default ajaxReducer(
  initialState,
  {
    startAction: USER_LOAD,
    failureAction: USER_LOAD_FAILURE,
    successAction: USER_LOAD_SUCCESS
  },
  {
    [USER_LOAD_SUCCESS]: (state, action) => {
      const responseUser = safeGet(action, ['response', 'body'], {});
      const user = UserModel.fromServerFormat(responseUser);

      return {
        ...initialState,
        user
      };
    }
  }
);
