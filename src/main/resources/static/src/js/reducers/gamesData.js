import _ from 'underscore';
import { reducer, safeGet } from 'utils';
import { mapGame, gameExample } from 'models/game';
import {
  LOAD_GAMES, LOAD_GAMES_SUCCESS, LOAD_GAMES_FAILURE
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
    const { time: lastUpdate } = action;
    const responseGames = safeGet(action, 'response.body', []);
    const mappedGames = _(responseGames).map(mapGame);
    const games = _.object(
      _(mappedGames).pluck('id'),
      mappedGames
    );

    return {
      ...initialState,
      lastUpdate,
      games
    };
  },

  [LOAD_GAMES_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  }
});
