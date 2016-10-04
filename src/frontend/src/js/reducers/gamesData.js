import { ajaxReducer } from 'utils';
import { GAMES_LOAD } from 'constants/actionTypes';
import { GameModel } from 'models';

const initialState = {
  games: []
};

export default ajaxReducer(initialState, GAMES_LOAD, {
  [GAMES_LOAD.SUCCESS]: (state, action) => {
    const { response = [] } = action;
    const games = response.map(GameModel.fromServerFormat);

    return {
      ...initialState,
      games
    };
  }
});
