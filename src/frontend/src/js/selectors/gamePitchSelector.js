import { createSelector } from 'reselect';
import { findById } from 'utils';

export default createSelector(
  state => state.pitchesData.pitches,
  state => state.gameData.game.pitchId,

  (pitches, pitchId) => findById(pitches, pitchId)
);
