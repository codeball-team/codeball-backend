import { now, reducer, safeGet, parseNumber } from 'utils';
import { mapGame, gameExample } from 'models/game';
import {
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  CLOSE_ENROLLMENT_STATUS_SUCCESS, DRAW_TEAMS_SUCCESS, END_GAME_SUCCESS,
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE,
  EDIT_GAME, CANCEL_EDIT_GAME, SAVE_GAME_SUCCESS, SAVE_GAME_FAILURE,
  ADD_GAME, ADD_GAME_SUCCESS, ADD_GAME_FAILURE,
  EDIT_GAME_SCORE_A, EDIT_GAME_SCORE_B
} from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  isEditing: false,
  lastUpdate: undefined,
  game: gameExample(),
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

  [CLOSE_ENROLLMENT_STATUS_SUCCESS]: gameLoaded,

  [DRAW_TEAMS_SUCCESS]: gameLoaded,

  [END_GAME_SUCCESS]: gameLoaded,

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

  [SAVE_GAME_SUCCESS]: gameLoaded,

  [SAVE_GAME_FAILURE]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [ADD_GAME]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [ADD_GAME_SUCCESS]: gameLoaded,

  [ADD_GAME_FAILURE]: (state) => {
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
        teamAScore: parseNumber(teamAScore)
      }
    };
  },

  [EDIT_GAME_SCORE_B]: (state, action) => {
    const { teamBScore } = action;
    return {
      ...state,
      editedGame: {
        ...state.editedGame,
        teamBScore: parseNumber(teamBScore)
      }
    };
  }
});

function gameLoaded(state, action) {
  const responseGame = safeGet(action, 'response.body', {});
  const game = mapGame(responseGame);

  return {
    ...initialState,
    lastUpdate: now(),
    game
  };
}
