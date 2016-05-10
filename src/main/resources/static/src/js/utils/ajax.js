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
    request
      .end((error, response) => {
        if (error || !response.ok) {
          dispatch({
            type: failureAction,
            error,
            response
          });

          dispatch({ type: AJAX_FAILURE });
          failureCallback && failureCallback();
        } else {
          dispatch({
            type: successAction,
            response
          });

          dispatch({ type: AJAX_SUCCESS });
          successCallback && successCallback();
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
