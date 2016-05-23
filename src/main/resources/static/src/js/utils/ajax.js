import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE} from 'constants/ActionTypes';

export default function ajax(options) {
  const {
    request,
    startAction,
    successAction,
    failureAction,
    successCallback,
    failureCallback,
    params
  } = options;

  return dispatch => {
    request.end((error, response) => {
      if (error || !response.ok) {
        dispatch({
          type: failureAction,
          error,
          response
        });

        ajaxCompleted(dispatch, AJAX_FAILURE, failureCallback);
      } else {
        dispatch({
          type: successAction,
          response
        });

        ajaxCompleted(dispatch, AJAX_SUCCESS, successCallback);
      }
    });

    dispatch({
      type: startAction,
      ...(params || {})
    });

    dispatch({ type: AJAX_START });

    return request;
  };
}

function ajaxCompleted(dispatch, ACTION_TYPE, callback) {
  dispatch({ type: ACTION_TYPE });
  if (callback) {
    callback();
  }
}
