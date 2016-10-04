import { reducer } from 'utils';
import {
  AJAX,
  AJAX_ABORT,
  AJAX_ERROR_ACKNOWLEDGE
} from 'constants/actionTypes';
import { ErrorModel } from 'models';

const initialState = {
  numberOfPendingRequests: 0,
  errors: []
};

export default reducer(initialState, {
  [AJAX]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests + 1
  }),

  [AJAX.FAILURE]: (state, action) => {
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

  [AJAX.SUCCESS]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests - 1
  }),

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
  }
});
