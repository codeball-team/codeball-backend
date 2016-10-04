import { ajaxReducer, sortByMany } from 'utils';
import { NEW_PITCH_SUBMIT, PITCHES_LOAD } from 'constants/actionTypes';
import { PitchModel } from 'models';

const initialState = {
  pitches: []
};

export default ajaxReducer(initialState, PITCHES_LOAD, {
  [NEW_PITCH_SUBMIT.SUCCESS]: (state, action) => {
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

  [PITCHES_LOAD.SUCCESS]: (state, action) => {
    const { response = [] } = action;
    const pitches = response.map(PitchModel.fromServerFormat);
    const sortedPitches = sortByMany(pitches, ['name']);

    return {
      ...initialState,
      pitches: sortedPitches
    };
  }
});
