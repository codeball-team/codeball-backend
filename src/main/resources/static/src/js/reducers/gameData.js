import _ from 'underscore';
import moment from 'moment';
import { now, reducer, safeGet } from 'utils';
import {
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE
} from 'constants/ActionTypes';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  DATE_FORMAT, TIME_FORMAT
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

  [LOAD_GAME_SUCCESS]: (state, action) => {
    const game = safeGet(action, 'response.body', {});

    const enrolledUsers = _(game.enrollmentIds).reduce(
      (sum, enrollmentStatus, userId) => {
        sum[enrollmentStatus].push(Number(userId));
        return sum;
      },

      {
        [ENROLLMENT_STATUS_YES]: [],
        [ENROLLMENT_STATUS_MAYBE]: [],
        [ENROLLMENT_STATUS_NO]: []
      }
    );

    const startDate = moment(game.startTimestamp * 1000);

    return {
      lastUpdate: now(),
      isLoading: false,
      game: {
        id: game.id,
        date: startDate.format(DATE_FORMAT),
        time: startDate.format(TIME_FORMAT),
        duration: game.durationInMinutes,
        pitchId: game.pitchId,
        isEnrollmentOver: game.isEnrollmentOver,
        isGameOver: game.isGameOver,
        enrolledUsers,
        teamAScore: game.teamAScore,
        teamA: game.teamAIds,
        teamBScore: game.teamBScore,
        teamB: game.teamBIds,
      }
    };
  },

  [LOAD_GAME_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [CHANGE_ENROLLMENT_STATUS]: (state, action) => {
    const { game } = state;
    const { id, enrolledUsers } = game;
    const { gameId, userId, enrollmentStatus } = action;

    if (id === gameId) {
      const newEnrolledUsers = _(enrolledUsers).reduce((users, userIds, status) => {
        users[status] = _(userIds).without(userId);
        return users;
      }, {});
      newEnrolledUsers[enrollmentStatus].push(userId);

      return {
        ...state,
        game: {
          ...state.game,
          enrolledUsers: newEnrolledUsers
        }
      };
    }

    return state;
  },

  [CHANGE_ENROLLMENT_STATUS_SUCCESS]: (state, action) => {
    return {
      ...state
    };
  },

  [CHANGE_ENROLLMENT_STATUS_FAILURE]: (state, action) => {
    return {
      ...state
    };
  }
});
