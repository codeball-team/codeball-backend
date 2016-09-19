import { ajaxReducer, safeGet } from 'utils';
import { PitchModel } from 'models';
import { PITCH_LOAD, PITCH_LOAD_FAILURE, PITCH_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  pitch: new PitchModel()
};

export default ajaxReducer(
  initialState,
  {
    startAction: PITCH_LOAD,
    failureAction: PITCH_LOAD_FAILURE,
    successAction: PITCH_LOAD_SUCCESS
  },
  {
    [PITCH_LOAD_SUCCESS]: (state, action) => {
      const responsePitch = safeGet(action, ['response', 'body'], {});
      const pitch = PitchModel.fromServerFormat(responsePitch);

      return {
        ...initialState,
        pitch
      };
    }
  }
);
