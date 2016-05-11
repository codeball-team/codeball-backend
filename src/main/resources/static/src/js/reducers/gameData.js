import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE } from 'constants/ActionTypes';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';

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

  [LOAD_GAME_SUCCESS]: (state, action) => {
    const responseGame = safeGet(action, 'response.body', []);

    const enrolledUsers = _(responseGame.enrollments).reduce(
      (sum, enrollment) => { /* TODO */
        const { enrollmentStatus } = enrollment;
        const href = safeGet(enrollment, '_links.user.href');
        sum[enrollmentStatus].push(href);

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
      duration: responseGame.duration.seconds / 60, /* TODO */
      pitchId: 1, /* TODO */
      isEnrollmentOver: responseGame.isEnrollmentOver,
      enrolledUsers,
      teamAScore: responseGame.teamAScore,
      teamA: [], /* TODO */
      teamBScore: responseGame.teamBScore,
      teamB: [] /* TODO */
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
