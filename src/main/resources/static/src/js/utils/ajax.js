import _ from 'underscore';
import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE} from 'constants/ActionTypes';

export default function ajax(getOptions) {
  return dispatch => {
    const {
      request,
      startAction,
      successAction,
      failureAction,
      successCallback,
      failureCallback,
      params
    } = getOptions(dispatch);

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

function ajaxCompleted(dispatch, ACTION_TYPE, callback = _.noop) {
  dispatch({ type: ACTION_TYPE });
  callback();
}
