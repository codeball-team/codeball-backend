import { AJAX_START, AJAX_SUCCESS, AJAX_FAILURE} from 'constants/ActionTypes';

export default function ajax(request, START_ACTION, SUCCESS_ACTION, FAILURE_ACTION, params) {
  return dispatch => {
    request
      .end((error, response) => {
        if (error || !response.ok) {
          dispatch({
            type: FAILURE_ACTION,
            error,
            response
          });

          dispatch({ type: AJAX_FAILURE });
        } else {
          dispatch({
            type: SUCCESS_ACTION,
            response
          });

          dispatch({ type: AJAX_SUCCESS });
        }
      });

    dispatch({
      type: START_ACTION,
      ...params
    });

    dispatch({ type: AJAX_START });

    return request;
  };
}
