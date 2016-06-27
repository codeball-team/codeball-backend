import _ from 'underscore';
import { now } from 'utils';
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

    const time = now();

    request.end((error, response) => {
      if (error || !response.ok) {
        dispatch({
          type: failureAction,
          time,
          error,
          response
        });
        dispatch({ type: AJAX_FAILURE });
        failureCallback(response);
      } else {
        dispatch({
          type: successAction,
          time,
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
