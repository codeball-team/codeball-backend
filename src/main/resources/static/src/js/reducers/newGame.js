import { reducer } from 'utils';
import {
  NEW_GAME_RESET,
  NEW_GAME_CHANGE_DATE,
  NEW_GAME_CHANGE_DURATION,
  NEW_GAME_CHANGE_HOUR,
  NEW_GAME_CHANGE_MINUTE,
  NEW_GAME_CHANGE_PITCH_ID
} from 'constants/ActionTypes';

const initialState = {
  date: undefined,
  duration: undefined,
  hour: 18,
  minute: 0,
  pitchId: undefined
};

export default reducer(initialState, {
  [NEW_GAME_RESET]: () => {
    return initialState;
  },

  [NEW_GAME_CHANGE_DATE]: (state, action) => {
    const { date } = action;
    return {
      ...state,
      date
    };
  },

  [NEW_GAME_CHANGE_DURATION]: (state, action) => {
    const { duration } = action;
    return {
      ...state,
      duration
    };
  },

  [NEW_GAME_CHANGE_HOUR]: (state, action) => {
    const { hour } = action;
    return {
      ...state,
      hour
    };
  },

  [NEW_GAME_CHANGE_MINUTE]: (state, action) => {
    const { minute } = action;
    return {
      ...state,
      minute
    };
  },

  [NEW_GAME_CHANGE_PITCH_ID]: (state, action) => {
    const { pitchId } = action;
    return {
      ...state,
      pitchId
    };
  }
});
