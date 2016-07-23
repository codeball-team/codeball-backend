import _ from 'underscore';
import { now, safeGet } from 'utils';
import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE } from 'constants/actionTypes';

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

    request.end((error, response = {}) => {
      const [title, message] = safeGet(error, ['message'], '').split('\n');
      const body = safeGet(response, ['body'], {
        error: title,
        message
      });
      if (error || !response.ok) {
        dispatch({
          type: failureAction,
          time,
          response: body
        });
        dispatch({
          type: AJAX_FAILURE,
          response: body
        });
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
