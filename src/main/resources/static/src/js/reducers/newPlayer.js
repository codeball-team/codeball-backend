import { reducer } from 'utils';
import {
  NEW_PLAYER_CHANGE_EMAIL, NEW_PLAYER_CHANGE_FIRST_NAME,
  NEW_PLAYER_CHANGE_LAST_NAME, NEW_PLAYER_CHANGE_ROLE,
  NEW_PLAYER_RESET
} from 'constants/actionTypes';
import { NewPlayerModel } from 'models';

const initialState = new NewPlayerModel();

export default reducer(initialState, {
  [NEW_PLAYER_CHANGE_EMAIL]: (state, action) => {
    const { email } = action;
    return { ...state, email };
  },

  [NEW_PLAYER_CHANGE_FIRST_NAME]: (state, action) => {
    const { firstName } = action;
    return { ...state, firstName };
  },

  [NEW_PLAYER_CHANGE_LAST_NAME]: (state, action) => {
    const { lastName } = action;
    return { ...state, lastName };
  },

  [NEW_PLAYER_CHANGE_ROLE]: (state, action) => {
    const { role } = action;
    return { ...state, role };
  },

  [NEW_PLAYER_RESET]: () => initialState
});
