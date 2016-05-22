import { reducer } from 'utils';
import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE} from 'constants/ActionTypes';

const initialState = 0;

export default reducer(initialState, {
  [AJAX_START]: (state) => {
    return state + 1;
  },

  [AJAX_SUCCESS]: (state) => {
    return state - 1;
  },

  [AJAX_FAILURE]: (state) => {
    return state - 1;
  }
});
