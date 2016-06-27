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
    } = {
      successCallback: _.noop,
      failureCallback: _.noop,
      ...getOptions(dispatch)
    };

    request.end((error, response) => {
      if (error || !response.ok) {
        dispatch({
          type: failureAction,
          error,
          response
        });
        dispatch({ type: AJAX_FAILURE });
        failureCallback(response);
      } else {
        dispatch({
          type: successAction,
          response
        });
        dispatch({ type: AJAX_SUCCESS });
        successCallback(response);
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
