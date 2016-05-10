import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE } from 'constants/ActionTypes';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';

const pitchTypes = {
  1: 'Firm Ground',
  2: 'Hard Ground',
  3: 'Artificial Hard',
  4: 'Artificial Soft (Turf)',
  5: 'Indoor'
};

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
  game: {
    date: '2016/05/04',
    time: '19:00',
    duration: 90,
    pitch: {
      id: 1,
      name: 'Boisko - ul. Św. Filipa',
      type: pitchTypes[3],
      address: 'ul. Św. Filipa 15, Kraków',
      url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
      minNumberOfPlayers: 8,
      maxNumberOfPlayers: 12
    },
    isEnrollmentOver: true,
    enrolledUsers: {
      [ENROLLMENT_STATUS_YES]: [4, 3],
      [ENROLLMENT_STATUS_MAYBE]: [1],
      [ENROLLMENT_STATUS_NO]: [2]
    },
    teamA: [2, 3],
    teamAScore: 6,
    teamB: [1, 4],
    teamBScore: 12
  }
};

export default reducer(initialState, {
  [LOAD_GAME]: (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_GAME_SUCCESS]: (state, action) => {
    const responseGame = safeGet(action, 'response.body', []);

    const enrolledUsers = _(responseGame.enrollments).reduce(
      (sum, enrollment) => {
        const { enrollmentStatus } = enrollment;
        const href = safeGet(enrollment, '_links.user.href');
        const userId = (href.match(/([\d]*)$/) || [])[0];
        sum[enrollmentStatus] = userId;

        return sum;
      },

      {
        [ENROLLMENT_STATUS_YES]: [],
        [ENROLLMENT_STATUS_MAYBE]: [],
        [ENROLLMENT_STATUS_NO]: []
      }
    );

    const game = {
      id: responseGame.id,
      date: '2016/05/04', /* TODO */
      time: '19:00', /* TODO */
      duration: responseGame.duration.seconds / 60,
      isEnrollmentOver: responseGame.isEnrollmentOver,
      enrolledUsers,
      teamAScore: responseGame.teamAScore,
      teamA: [],
      teamBScore: responseGame.teamBScore,
      teamB: [],
      pitch: initialState.game.pitch
    };

    return {
      lastUpdate: now(),
      isLoading: false,
      game
    };
  },

  [LOAD_GAME_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
