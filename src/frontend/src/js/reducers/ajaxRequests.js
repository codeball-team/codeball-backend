import { reducer } from 'utils';
import { ErrorModel } from 'models';
import {
  AJAX_ABORT, AJAX_ERROR_ACKNOWLEDGE, AJAX_FAILURE,
  AJAX_START, AJAX_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  numberOfPendingRequests: 0,
  errors: []
};

export default reducer(initialState, {
  [AJAX_ABORT]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests - 1
  }),

  [AJAX_ERROR_ACKNOWLEDGE]: (state, action) => {
    const { errorIndex } = action;
    const { errors } = state;

    return {
      ...state,
      errors: [
        ...errors.slice(0, errorIndex),
        ...errors.slice(errorIndex + 1)
      ]
    };
  },

  [AJAX_FAILURE]: (state, action) => {
    const { response } = action;
    const { errors } = state;
    const error = ErrorModel.fromServerFormat(response);

    return {
      ...state,
      errors: [
        ...errors,
        error
      ],
      numberOfPendingRequests: state.numberOfPendingRequests - 1
    };
  },

  [AJAX_START]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests + 1
  }),

  [AJAX_SUCCESS]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests - 1
  })
});
