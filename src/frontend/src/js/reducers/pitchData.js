import { ajaxReducer } from 'utils';
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
      const { response } = action;
      const pitch = PitchModel.fromServerFormat(response);

      return {
        ...initialState,
        pitch
      };
    }
  }
);
