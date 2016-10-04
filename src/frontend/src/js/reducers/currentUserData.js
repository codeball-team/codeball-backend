import { ajaxReducer } from 'utils';
import { CURRENT_USER_LOAD } from 'constants/actionTypes';
import { UserModel } from 'models';

const initialState = {
  currentUser: new UserModel()
};

export default ajaxReducer(initialState, CURRENT_USER_LOAD, {
  [CURRENT_USER_LOAD.SUCCESS]: (state, action) => {
    const { response } = action;
    const currentUser = UserModel.fromServerFormat(response);

    return {
      ...initialState,
      currentUser
    };
  }
});
