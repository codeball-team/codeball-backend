import { ajaxReducer, ajaxReducerInitialState, safeGet, sortByMany } from 'utils';
import { GameModel } from 'models';
import { GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  ...ajaxReducerInitialState,
  games: []
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
      const responseGames = safeGet(action, ['response', 'body'], []);
      const mappedGames = responseGames.map(GameModel.fromServerFormat);
      const sortedGames = sortByMany(mappedGames, ['date']).reverse();

      return {
        ...initialState,
        games: sortedGames
      };
    }
  }
);