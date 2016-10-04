import { ajaxReducer, parseNumber } from 'utils';
import {
  GAME_CHANGE_ENROLLMENT_STATUS,
  GAME_CLOSE_ENROLLMENT,
  GAME_DRAW_TEAMS,
  GAME_EDIT,
  GAME_EDIT_CANCEL,
  GAME_EDIT_SCORE_A,
  GAME_EDIT_SCORE_B,
  GAME_END,
  GAME_ENROLL_ANOTHER_USER_SUBMIT,
  GAME_LOAD,
  GAME_SET_SCORE,
  NEW_GAME_SUBMIT
} from 'constants/actionTypes';
import { GameModel } from 'models';

const initialState = {
  isEditing: false,
  game: new GameModel(),
  editedGame: {}
};

export default ajaxReducer(initialState, GAME_LOAD, {
  [GAME_CHANGE_ENROLLMENT_STATUS.SUCCESS]: gameLoaded,

  [GAME_CLOSE_ENROLLMENT.SUCCESS]: gameLoaded,

  [GAME_DRAW_TEAMS.SUCCESS]: gameLoaded,

  [GAME_EDIT]: state => ({
    ...state,
    editedGame: {
      ...state.game
    },
    isEditing: true
  }),

  [GAME_EDIT_CANCEL]: state => ({
    ...state,
    editedGame: {},
    isEditing: false
  }),

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

  [GAME_END.SUCCESS]: gameLoaded,

  [GAME_ENROLL_ANOTHER_USER_SUBMIT.SUCCESS]: gameLoaded,

  [GAME_LOAD.SUCCESS]: gameLoaded,

  [GAME_SET_SCORE.SUCCESS]: gameLoaded,

  [GAME_SET_SCORE.FAILURE]: continueEditing,

  [NEW_GAME_SUBMIT]: continueEditing,

  [NEW_GAME_SUBMIT.FAILURE]: continueEditing,

  [NEW_GAME_SUBMIT.SUCCESS]: gameLoaded
});

function gameLoaded(state, action) {
  const { response } = action;
  const game = GameModel.fromServerFormat(response);

  return {
    ...initialState,
    game
  };
}

function continueEditing(state) {
  return {
    ...state,
    isEditing: true
  };
}
