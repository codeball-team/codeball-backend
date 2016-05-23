import { mapGame } from 'api';
import { now, reducer, safeGet } from 'utils';
import {
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE,
  EDIT_GAME, CANCEL_EDIT_GAME, SAVE_GAME, SAVE_GAME_SUCCESS, SAVE_GAME_FAILURE,
  EDIT_GAME_SCORE_A, EDIT_GAME_SCORE_B
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
  },
  isEditing: false,
  editedGame: {}
};

export default reducer(initialState, {
  [LOAD_GAME]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_GAME_SUCCESS]: gameLoaded,

  [LOAD_GAME_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [CHANGE_ENROLLMENT_STATUS]: (state) => state,

  [CHANGE_ENROLLMENT_STATUS_SUCCESS]: gameLoaded,

  [CHANGE_ENROLLMENT_STATUS_FAILURE]: (state) => state,

  [EDIT_GAME]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [CANCEL_EDIT_GAME]: (state) => {
    return {
      ...state,
      editedGame: {},
      isEditing: false
    };
  },

  [SAVE_GAME]: (state) => {
    return {
      ...state
    };
  },

  [SAVE_GAME_SUCCESS]: gameLoaded,

  [SAVE_GAME_FAILURE]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [EDIT_GAME_SCORE_A]: (state, action) => {
    const { teamAScore } = action;
    return {
      ...state,
      editedGame: {
        ...state.editedGame,
        teamAScore
      }
    };
  },

  [EDIT_GAME_SCORE_B]: (state, action) => {
    const { teamBScore } = action;
    return {
      ...state,
      editedGame: {
        ...state.editedGame,
        teamBScore
      }
    };
  }
});

function gameLoaded(state, action) {
  const game = safeGet(action, 'response.body', {});

  return {
    lastUpdate: now(),
    isLoading: false,
    isEditing: false,
    game: mapGame(game),
    editedGame: {}
  };
}
