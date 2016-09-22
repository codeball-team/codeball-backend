import { _, now, safeGet } from 'utils';
import { AJAX_ABORT, AJAX_FAILURE, AJAX_START, AJAX_SUCCESS } from 'constants/actionTypes';
import requestManager from './requestManager';

const manager = requestManager();
const requestOptionsHandlers = {
  json: request => request.set('Content-Type', 'application/json')
};
const requestManagerHandlers = {
  debounce: (request, { startAction }) => manager.debounce(startAction, request),
  throttle: (request, { startAction }) => manager.throttle(startAction, request)
};

export default function ajax(getParams) {
  return dispatch => {
    const options = {
      failureCallback: _.noop,
      successCallback: _.noop,
      ...getParams(dispatch)
    };
    const {
      actionsData = {},
      request,
      failureAction,
      failureCallback,
      startAction,
      successAction,
      successCallback
    } = options;
    const timestamp = now();

    applyRequestOptions(requestOptionsHandlers, request, options);
    applyRequestEnhancers(requestManagerHandlers, request, options).then(() => {
      request.end((error, response = {}) => {
        manager.forget(startAction);
        const body = nullToUndefined(safeGet(response, ['body']));

        if(error || !response.ok) {
          const errorResponse = createErrorResponse(error, body);
          dispatch({
            type: failureAction,
            ...actionsData,
            response: errorResponse,
            timestamp
          });
          dispatch({
            type: AJAX_FAILURE,
            response: errorResponse
          });
          failureCallback(response);
        } else {
          dispatch({
            type: successAction,
            ...actionsData,
            response: body,
            timestamp
          });
          dispatch({ type: AJAX_SUCCESS });
          successCallback(response);
        }
      });

      request.xhr.onabort = () => {
        dispatch({ type: AJAX_ABORT });
        dispatch({ type: failureAction, timestamp });
      };

      dispatch({
        type: startAction,
        ...actionsData
      });
      dispatch({ type: AJAX_START });
    }, () => {
      manager.forget(startAction);
    });

    return request;
  };
}

function applyRequestOptions(enhancers, request, options) {
  return _(options).reduce(
    (enhancedRequest, isEnabled, key) => {
      if(isEnabled && enhancers.hasOwnProperty(key)) {
        return enhancers[key](enhancedRequest, options);
      }

      return enhancedRequest;
    },
    request
  );
}

function applyRequestEnhancers(enhancers, request, options) {
  return Promise.all(
    _(options).reduce(
      (enhancements, isEnabled, key) => {
        if(isEnabled && enhancers.hasOwnProperty(key)) {
          return [
            ...enhancements,
            enhancers[key](request, options)
          ];
        }

        return enhancements;
      },
      []
    )
  );
}

function createErrorResponse(error, body) {
  const [title, message] = safeGet(error, ['message'], '').split('\n');
  const errorResponse = body || { error: title, message };
  return errorResponse;
}

function nullToUndefined(value) {
  if(value === null) {
    return undefined;
  }

  return value;
}
