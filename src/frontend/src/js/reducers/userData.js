import { ajaxReducer } from 'utils';
import { USER_LOAD } from 'constants/actionTypes';
import { UserModel } from 'models';

const initialState = {
  user: new UserModel()
};

export default ajaxReducer(initialState, USER_LOAD, {
  [USER_LOAD.SUCCESS]: (state, action) => {
    const { response } = action;
    const user = UserModel.fromServerFormat(response);

    return {
      ...initialState,
      user
    };
  }
});
