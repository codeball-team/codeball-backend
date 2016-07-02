import { ajaxReducer, objectify, safeGet } from 'utils';
import { PitchModel } from 'models';
import { PITCHES_LOAD, PITCHES_LOAD_FAILURE, PITCHES_LOAD_SUCCESS } from 'constants/actionTypes';

const initialState = {
  isLoading: false,
  lastUpdate: undefined,
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
    [PITCHES_LOAD_SUCCESS]: (state, action) => {
      const { time: lastUpdate } = action;
      const responsePitches = safeGet(action, ['response', 'body'], []);
      const mappedPitches = responsePitches.map(PitchModel.fromServerFormat);
      const pitches = objectify(mappedPitches);

      return {
        ...initialState,
        lastUpdate,
        pitches
      };
    }
  }
);
