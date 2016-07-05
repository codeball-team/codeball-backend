import _ from 'underscore';

export default class NewUserModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      role: undefined
    }));
  }

  static isValid(newUserModel) {
    const { email, firstName, lastName, role } = newUserModel;
    return [email, firstName, lastName, role].every(Boolean);
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
