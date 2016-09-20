import { model } from 'utils';
import { ENROLLMENT_STATUS_YES } from 'constants';

const EnrollmentModel = model({
  defaultAttributes: () => ({
    enrollmentStatus: ENROLLMENT_STATUS_YES,
    userId: undefined
  }),

  fromServerFormat(serverResponse) {
    return new EnrollmentModel({
      enrollmentStatus: serverResponse.enrollmentStatus,
      userId: serverResponse.userId
    });
  }
});

export default EnrollmentModel;
