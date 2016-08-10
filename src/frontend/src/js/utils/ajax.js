import { _, now, safeGet } from 'utils';
import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE } from 'constants/actionTypes';

const requestOptionsHandlers = {
  json: request => request.set('Content-Type', 'application/json')
};

export default function ajax(getParams) {
  return dispatch => {
    const {
      request,
      startAction,
      successAction,
      failureAction,
      successCallback,
      failureCallback,
      actionsData = {},
      ...options
    } = {
      successCallback: _.noop,
      failureCallback: _.noop,
      ...getParams(dispatch)
    };
    const time = now();

    applyRequestOptions(request, options);

    request.end((error, response = {}) => {
      const [title, message] = safeGet(error, ['message'], '').split('\n');
      const body = safeGet(response, ['body'], {
        error: title,
        message
      });
      if (error || !response.ok) {
        dispatch({
          type: failureAction,
          ...actionsData,
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
          ...actionsData,
          time,
          response
        });
        dispatch({ type: AJAX_SUCCESS });
        successCallback(response);
      }
    });

    dispatch({
      type: startAction,
      ...actionsData
    });

    dispatch({ type: AJAX_START });

    return request;
  };
}

function applyRequestOptions(request, options) {
  return _(options).reduce(
    (enhancedRequest, value, key) => requestOptionsHandlers[key](enhancedRequest, value),
    request
  );
}
