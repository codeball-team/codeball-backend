import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { LOAD_PITCHES, LOAD_PITCHES_SUCCESS, LOAD_PITCHES_FAILURE } from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  pitches: {
    1: {
      id: 1,
      name: 'Boisko - ul. Św. Filipa',
      type: 5,
      address: 'ul. Św. Filipa 15, Kraków',
      url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
      minNumberOfPlayers: 8,
      maxNumberOfPlayers: 12
    }
  }
};

export default reducer(initialState, {
  [LOAD_PITCHES]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_PITCHES_SUCCESS]: (state, action) => {
    const responsePitches = safeGet(action, 'response.body._embedded.pitches', []);

    const mappedPitches = _(responsePitches).map(pitch => ({
      id: pitch.id,
      name: pitch.name,
      address: pitch.address,
      minNumberOfPlayers: pitch.minNumberOfPlayers,
      maxNumberOfPlayers: pitch.maxNumberOfPlayers,
      type: undefined,
      url: undefined
    }));

    const pitches = _.object(
      _(mappedPitches).pluck('id'),
      mappedPitches
    );

    return {
      lastUpdate: now(),
      isLoading: false,
      pitches
    };
  },

  [LOAD_PITCHES_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
