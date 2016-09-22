import { createStructuredSelector } from 'reselect';
import { newPitchSelector } from 'selectors/models/newPitch';

export default createStructuredSelector({
  newPitch: newPitchSelector
});
