import _ from 'underscore';
import { mapGame } from 'api';
import { now, reducer, safeGet } from 'utils';
import {
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE
} from 'constants/ActionTypes';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
} from 'constants/Configuration';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  game: {
    date: '2016/05/04',
    time: '19:00',
    duration: 90,
    pitchId: 1,
    isEnrollmentOver: false,
    enrolledUsers: {
      [ENROLLMENT_STATUS_YES]: [],
      [ENROLLMENT_STATUS_MAYBE]: [],
      [ENROLLMENT_STATUS_NO]: []
    },
    teamA: [],
    teamAScore: undefined,
    teamB: [],
    teamBScore: undefined
  }
};

export default reducer(initialState, {
  [LOAD_GAME]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_GAME_SUCCESS]: gameLoaded,

  [LOAD_GAME_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [CHANGE_ENROLLMENT_STATUS]: (state) => state,

  [CHANGE_ENROLLMENT_STATUS_SUCCESS]: gameLoaded,

  [CHANGE_ENROLLMENT_STATUS_FAILURE]: (state) => state
});

function gameLoaded(state, action) {
  const game = safeGet(action, 'response.body', {});

  return {
    lastUpdate: now(),
    isLoading: false,
    game: mapGame(game)
  };
}
