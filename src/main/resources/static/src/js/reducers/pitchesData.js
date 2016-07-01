import _ from 'underscore';
import { reducer, safeGet } from 'utils';
import { mapPitch, pitchExample } from 'models/pitch';
import {
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS
} from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  pitches: {
    [pitchExample().id]: pitchExample()
  }
};

export default reducer(initialState, {
  [PITCHES_LOAD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [PITCHES_LOAD_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [PITCHES_LOAD_SUCCESS]: (state, action) => {
    const { time: lastUpdate } = action;
    const responsePitches = safeGet(action, 'response.body', []);
    const mappedPitches = _(responsePitches).map(mapPitch);
    const pitches = _.object(
      _(mappedPitches).pluck('id'),
      mappedPitches
    );

    return {
      ...initialState,
      lastUpdate,
      pitches
    };
  }
});
