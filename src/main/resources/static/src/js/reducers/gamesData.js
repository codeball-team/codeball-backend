import _ from 'underscore';
import { now, reducer, safeGet } from 'utils';
import { mapGame, gameExample } from 'models/game';
import {
  LOAD_GAMES, LOAD_GAMES_SUCCESS, LOAD_GAMES_FAILURE,
  EDIT_GAMES, CANCEL_EDIT_GAMES
} from 'constants/ActionTypes';

const initialState = {
  isLoading: false,
  isEditing: false,
  lastUpdate: undefined,
  games: [
    gameExample()
  ]
};

export default reducer(initialState, {
  [LOAD_GAMES]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [LOAD_GAMES_SUCCESS]: (state, action) => {
    const responseGames = safeGet(action, 'response.body', []);
    const games = _(responseGames).map(mapGame);

    return {
      ...initialState,
      lastUpdate: now(),
      games
    };
  },

  [LOAD_GAMES_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [EDIT_GAMES]: (state) => {
    return {
      ...state,
      isEditing: true
    };
  },

  [CANCEL_EDIT_GAMES]: (state) => {
    return {
      ...state,
      isEditing: false
    };
  }
});
