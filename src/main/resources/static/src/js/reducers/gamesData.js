import _ from 'underscore';
import moment from 'moment';
import { mapGame } from 'api';
import { now, reducer, safeGet } from 'utils';
import {
  LOAD_GAMES, LOAD_GAMES_SUCCESS, LOAD_GAMES_FAILURE
} from 'constants/ActionTypes';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
} from 'constants/Configuration';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  games: [
    {
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
  ]
};

export default reducer(initialState, {
  [LOAD_GAMES]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_GAMES_SUCCESS]: (state, action) => {
    const games = safeGet(action, 'response.body', []);

    return {
      lastUpdate: now(),
      isLoading: false,
      games: _(games).map(mapGame)
    };
  },

  [LOAD_GAMES_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
