import { _, now, safeGet } from 'utils';
import { AJAX_ABORT, AJAX_START, AJAX_SUCCESS, AJAX_FAILURE } from 'constants/actionTypes';
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
      successCallback: _.noop,
      failureCallback: _.noop,
      ...getParams(dispatch)
    };
    const {
      request,
      startAction,
      successAction,
      failureAction,
      successCallback,
      failureCallback,
      actionsData = {}
    } = options;
    const timestamp = now();

    applyRequestOptions(requestOptionsHandlers, request, options);
    applyRequestEnhancers(requestManagerHandlers, request, options).then(() => {
      request.end((error, response = {}) => {
        manager.forget(startAction);

        const [title, message] = safeGet(error, ['message'], '').split('\n');
        const body = nullToUndefined(safeGet(response, ['body'], { error: title, message }));

        if (error || !response.ok) {
          dispatch({
            type: failureAction,
            ...actionsData,
            timestamp,
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
            timestamp,
            response
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
      if (isEnabled && enhancers.hasOwnProperty(key)) {
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
        if (isEnabled && enhancers.hasOwnProperty(key)) {
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

function nullToUndefined(value) {
  if (value === null) {
    return undefined;
  }

  return value;
}
