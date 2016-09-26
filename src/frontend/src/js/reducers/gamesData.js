import { ajaxReducer } from 'utils';
import { GameModel } from 'models';
import { GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
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
      const { response = [] } = action;
      const games = response.map(GameModel.fromServerFormat);

      return {
        ...initialState,
        games
      };
    }
  }
);
