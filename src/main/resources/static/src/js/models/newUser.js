import _ from 'underscore';
import { ROLES } from 'constants';

export default class NewUserModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      role: undefined
    }));
  }

  static isEmailValid(email) {
    return typeof email === 'string' && email.length > 0;
  }

  static isFirstNameValid(firstName) {
    return typeof firstName === 'string' && firstName.length > 0;
  }

  static isLastNameValid(lastName) {
    return typeof lastName === 'string' && lastName.length > 0;
  }

  static isRoleValid(role) {
    return ROLES.includes(role);
  }

  static isValid(newUserModel) {
    const { email, firstName, lastName, role } = newUserModel;

    return [
      NewUserModel.isEmailValid(email),
      NewUserModel.isFirstNameValid(firstName),
      NewUserModel.isLastNameValid(lastName),
      NewUserModel.isRoleValid(role)
    ].every(Boolean);
  }

  static toServerFormat(newUserModel) {
    const { email, firstName, lastName, role } = newUserModel;

    return {
      email,
      firstName,
      lastName,
      role
    };
  }
}
