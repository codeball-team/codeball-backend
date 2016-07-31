import { ajaxReducer, ajaxReducerInitialState, safeGet, sortByMany } from 'utils';
import {
  NEW_PITCH_SUBMIT_SUCCESS,
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS
} from 'constants/actionTypes';
import { PitchModel } from 'models';

const initialState = {
  ...ajaxReducerInitialState,
  pitches: []
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

      return {
        ...state,
        pitches: [
          ...state.pitches,
          mappedPitch
        ]
      };
    },

    [PITCHES_LOAD_SUCCESS]: (state, action) => {
      const responsePitches = safeGet(action, ['response', 'body'], []);
      const mappedPitches = responsePitches.map(PitchModel.fromServerFormat);
      const sortedPitches = sortByMany(mappedPitches, ['name']);

      return {
        ...initialState,
        pitches: sortedPitches
      };
    }
  }
);
