import { ajaxReducer, objectify, safeGet } from 'utils';
import { GameModel } from 'models';
import { GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  isEditing: false,
  lastUpdate: undefined,
  games: {
    [GameModel.example().id]: GameModel.example()
  }
};

export default ajaxReducer(
  initialState,
  {
    startAction: GAMES_LOAD,
    failureAction: GAMES_LOAD_FAILURE,
    successAction: GAMES_LOAD_SUCCESS
  },
  {
    [GAMES_LOAD_SUCCESS]: (state, action) => {
      const { time: lastUpdate } = action;
      const responseGames = safeGet(action, ['response', 'body'], []);
      const mappedGames = responseGames.map(GameModel.fromServerFormat);
      const games = objectify(mappedGames);

      return {
        ...initialState,
        lastUpdate,
        games
      };
    }
  }
);
