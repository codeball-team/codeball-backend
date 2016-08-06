import { _ } from 'utils';
import { ENROLLMENT_STATUS_YES } from 'constants';

export default class EnrollUserModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      userId: undefined,
      enrollmentStatus: ENROLLMENT_STATUS_YES
    }));
  }

  static isUserIdValid(userId) {
    return Number.isInteger(userId);
  }

  static isValid(enrollUserModel) {
    const { userId } = enrollUserModel;

    return [
      EnrollUserModel.isUserIdValid(userId)
    ].every(Boolean);
  }
}
