import { ajaxReducer, ajaxReducerInitialState, objectify, safeGet } from 'utils';
import { PitchModel } from 'models';
import {
  NEW_PITCH_SUBMIT_SUCCESS,
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  ...ajaxReducerInitialState,
  pitches: {
    [PitchModel.example().id]: PitchModel.example()
  }
};

export default ajaxReducer(
  initialState,
  {
    startAction: PITCHES_LOAD,
    failureAction: PITCHES_LOAD_FAILURE,
    successAction: PITCHES_LOAD_SUCCESS
  },
  {
    [NEW_PITCH_SUBMIT_SUCCESS]: (state, action) => {
      const responsePitch = safeGet(action, ['response', 'body'], {});
      const mappedPitch = PitchModel.fromServerFormat(responsePitch);
      const { id } = mappedPitch;
      return {
        ...state,
        pitches: {
          ...state.pitches,
          [id]: mappedPitch
        }
      };
    },

    [PITCHES_LOAD_SUCCESS]: (state, action) => {
      const responsePitches = safeGet(action, ['response', 'body'], []);
      const mappedPitches = responsePitches.map(PitchModel.fromServerFormat);
      const pitches = objectify(mappedPitches);
      return { ...initialState, pitches };
    }
  }
);
