import { reducer } from 'utils';
import {
  NEW_PITCH_CHANGE_ADDRESS,
  NEW_PITCH_CHANGE_MAX_NUMBER_OF_PLAYERS,
  NEW_PITCH_CHANGE_MIN_NUMBER_OF_PLAYERS,
  NEW_PITCH_CHANGE_NAME,
  NEW_PITCH_CHANGE_TYPE,
  NEW_PITCH_RESET
} from 'constants/actionTypes';
import { NewPitchModel } from 'models';

const initialState = new NewPitchModel();

export default reducer(initialState, {
  [NEW_PITCH_CHANGE_ADDRESS]: (state, action) => {
    const { address } = action;

    return {
      ...state,
      address
    };
  },

  [NEW_PITCH_CHANGE_MAX_NUMBER_OF_PLAYERS]: (state, action) => {
    const { maxNumberOfPlayers } = action;

    return {
      ...state,
      maxNumberOfPlayers
    };
  },

  [NEW_PITCH_CHANGE_MIN_NUMBER_OF_PLAYERS]: (state, action) => {
    const { minNumberOfPlayers } = action;

    return {
      ...state,
      minNumberOfPlayers
    };
  },

  [NEW_PITCH_CHANGE_NAME]: (state, action) => {
    const { name } = action;

    return {
      ...state,
      name
    };
  },

  [NEW_PITCH_CHANGE_TYPE]: (state, action) => {
    const { pitchType } = action;

    return {
      ...state,
      type: pitchType
    };
  },

  [NEW_PITCH_RESET]: () => initialState
});
