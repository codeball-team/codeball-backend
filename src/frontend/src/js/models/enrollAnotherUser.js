import { model } from 'utils';
import { isInteger } from 'utils/validation';
import { ENROLLMENT_STATUS_YES } from 'constants';

const EnrollAnotherUserModel = model({
  getDefaultAttributes: () => ({
    enrollmentStatus: ENROLLMENT_STATUS_YES,
    userId: undefined
  }),

  validators: {
    isUserIdValid({ userId }) {
      return isInteger(userId);
    }
  }
});

export default EnrollAnotherUserModel;
