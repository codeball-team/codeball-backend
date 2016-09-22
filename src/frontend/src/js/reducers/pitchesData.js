import { ajaxReducer, sortByMany } from 'utils';
import {
  NEW_PITCH_SUBMIT_SUCCESS,
  PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS
} from 'constants/actionTypes';
import { PitchModel } from 'models';

const initialState = {
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
      const { response } = action;
      const pitch = PitchModel.fromServerFormat(response);

      return {
        ...state,
        pitches: [
          ...state.pitches,
          pitch
        ]
      };
    },

    [PITCHES_LOAD_SUCCESS]: (state, action) => {
      const { response = [] } = action;
      const pitches = response.map(PitchModel.fromServerFormat);
      const sortedPitches = sortByMany(pitches, ['name']);

      return {
        ...initialState,
        pitches: sortedPitches
      };
    }
  }
);
