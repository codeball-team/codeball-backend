import { reducer } from 'utils';
import {
  AJAX_ERROR_ACKNOWLEDGE,
  AJAX_START, AJAX_FAILURE, AJAX_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  numberOfPendingRequests: 0,
  errors: []
};

export default reducer(initialState, {
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

  [AJAX_START]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests + 1
  }),

  [AJAX_FAILURE]: (state, action) => {
    const { response: { error, message } } = action;
    const { errors } = state;

    return {
      ...state,
      errors: [
        ...errors,
        {
          title: error,
          message
        }
      ],
      errorMessage: message,
      numberOfPendingRequests: state.numberOfPendingRequests - 1
    };
  },

  [AJAX_SUCCESS]: state => ({
    ...state,
    numberOfPendingRequests: state.numberOfPendingRequests - 1
  })
});
