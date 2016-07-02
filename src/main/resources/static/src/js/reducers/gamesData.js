import { objectify, reducer, safeGet } from 'utils';
import { mapGame, gameExample } from 'models/game';
import {
  GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  isEditing: false,
  lastUpdate: undefined,
  games: {
    [gameExample().id]: gameExample()
  }
};

export default reducer(initialState, {
  [GAMES_LOAD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [GAMES_LOAD_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [GAMES_LOAD_SUCCESS]: (state, action) => {
    const { time: lastUpdate } = action;
    const responseGames = safeGet(action, ['response', 'body'], []);
    const mappedGames = responseGames.map(mapGame);
    const games = objectify(mappedGames);

    return {
      ...initialState,
      lastUpdate,
      games
    };
  }
});
