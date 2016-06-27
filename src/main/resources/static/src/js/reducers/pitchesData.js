import _ from 'underscore';
import { reducer, safeGet } from 'utils';
import { mapPitch, pitchExample } from 'models/pitch';
import { LOAD_PITCHES, LOAD_PITCHES_SUCCESS, LOAD_PITCHES_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  pitches: {
    [pitchExample().id]: pitchExample()
  }
};

export default reducer(initialState, {
  [LOAD_PITCHES]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_PITCHES_SUCCESS]: (state, action) => {
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
  },

  [LOAD_PITCHES_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
