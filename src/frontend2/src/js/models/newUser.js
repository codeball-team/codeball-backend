import { model } from 'utils';
import { ROLES } from 'constants';

const NewUserModel = model({
  defaultAttributes: () => ({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    role: undefined
  }),
  validators: {
    isEmailValid({ email }) {
      return typeof email === 'string' && email.length > 0;
    },

    isFirstNameValid({ firstName }) {
      return typeof firstName === 'string' && firstName.length > 0;
    },

    isLastNameValid({ lastName }) {
      return typeof lastName === 'string' && lastName.length > 0;
    },

    isRoleValid({ role }) {
      return ROLES.includes(role);
    }
  },
  toServerFormat(newUserModel) {
    const { email, firstName, lastName, role } = newUserModel;

    return {
      email,
      firstName,
      lastName,
      role
    };
  }
});

export default NewUserModel;
