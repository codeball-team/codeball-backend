import { reducer } from 'utils';
import {
  GAME_ENROLL_ANOTHER_USER_EDIT,
  GAME_ENROLL_ANOTHER_USER_EDIT_CANCEL,
  GAME_ENROLL_ANOTHER_USER_RESET,
  GAME_ENROLL_ANOTHER_USER_CHANGE_USER_ID
} from 'constants/actionTypes';
import { EnrollAnotherUserModel } from 'models';

const initialState = {
  ...new EnrollAnotherUserModel(),
  isEditing: false
};

export default reducer(initialState, {
  [GAME_ENROLL_ANOTHER_USER_EDIT]: state => ({
    ...state,
    isEditing: true
  }),

  [GAME_ENROLL_ANOTHER_USER_CHANGE_USER_ID]: (state, action) => {
    const { userId } = action;

    return {
      ...state,
      userId
    };
  },

  [GAME_ENROLL_ANOTHER_USER_EDIT_CANCEL]: () => initialState,

  [GAME_ENROLL_ANOTHER_USER_RESET]: () => initialState
});
