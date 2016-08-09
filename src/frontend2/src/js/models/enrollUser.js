import { model } from 'utils';
import { ENROLLMENT_STATUS_YES } from 'constants';

const EnrollUserModel = model({
  defaultAttributes: () => ({
    userId: undefined,
    enrollmentStatus: ENROLLMENT_STATUS_YES
  }),
  validators: {
    isUserIdValid({ userId }) {
      return Number.isInteger(userId);
    }
  }
});

export default EnrollUserModel;
