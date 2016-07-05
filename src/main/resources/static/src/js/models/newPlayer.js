import _ from 'underscore';

export default class NewPlayerModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      role: undefined
    }));
  }

  static isValid(newPlayerModel) {
    const { email, firstName, lastName, role } = newPlayerModel;
    return [email, firstName, lastName, role].every(Boolean);
  }

  static toServerFormat(newPlayerModel) {
    const { email, firstName, lastName, role } = newPlayerModel;

    return {
      email,
      firstName,
      lastName,
      role
    };
  }
}
