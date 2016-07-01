import { reducer, safeGet, parseNumber } from 'utils';
import { mapGame, gameExample } from 'models/game';
import {
  GAME_CHANGE_ENROLLMENT_STATUS, GAME_CHANGE_ENROLLMENT_STATUS_FAILURE, GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
  GAME_CLOSE_ENROLLMENT_SUCCESS, GAME_DRAW_TEAMS_SUCCESS, GAME_EDIT,
  GAME_EDIT_CANCEL, GAME_EDIT_SCORE_A, GAME_EDIT_SCORE_B, GAME_END_SUCCESS,
  GAME_LOAD, GAME_LOAD_FAILURE, GAME_LOAD_SUCCESS,
  GAME_SAVE_FAILURE, GAME_SAVE_SUCCESS,
  NEW_GAME_SUBMIT, NEW_GAME_SUBMIT_FAILURE, NEW_GAME_SUBMIT_SUCCESS
} from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  isEditing: false,
  lastUpdate: undefined,
  game: gameExample(),
  editedGame: {}
};

export default reducer(initialState, {
  [GAME_CHANGE_ENROLLMENT_STATUS]: (state) => state,

  [GAME_CHANGE_ENROLLMENT_STATUS_FAILURE]: (state) => state,

  [GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS]: gameLoaded,

  [GAME_CLOSE_ENROLLMENT_SUCCESS]: gameLoaded,

  [GAME_DRAW_TEAMS_SUCCESS]: gameLoaded,

  [GAME_EDIT]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [GAME_EDIT_CANCEL]: (state) => {
    return {
      ...state,
      editedGame: {},
      isEditing: false
    };
  },

  [GAME_EDIT_SCORE_A]: (state, action) => {
    const { teamAScore } = action;
    return {
      ...state,
      editedGame: {
        ...state.editedGame,
        teamAScore: parseNumber(teamAScore)
      }
    };
  },

  [GAME_EDIT_SCORE_B]: (state, action) => {
    const { teamBScore } = action;
    return {
      ...state,
      editedGame: {
        ...state.editedGame,
        teamBScore: parseNumber(teamBScore)
      }
    };
  },

  [GAME_END_SUCCESS]: gameLoaded,

  [GAME_LOAD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [GAME_LOAD_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [GAME_LOAD_SUCCESS]: gameLoaded,

  [GAME_SAVE_FAILURE]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [GAME_SAVE_SUCCESS]: gameLoaded,

  [NEW_GAME_SUBMIT]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [NEW_GAME_SUBMIT_FAILURE]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [NEW_GAME_SUBMIT_SUCCESS]: gameLoaded
});

function gameLoaded(state, action) {
  const { time: lastUpdate } = action;
  const responseGame = safeGet(action, 'response.body', {});
  const game = mapGame(responseGame);

  return {
    ...initialState,
    lastUpdate,
    game
  };
}
