import { AJAX_ERROR_ACKNOWLEDGE } from 'constants/actionTypes';

export function ajaxErrorAcknowledge(errorIndex) {
  return {
    type: AJAX_ERROR_ACKNOWLEDGE,
    errorIndex
  };
}
