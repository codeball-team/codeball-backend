import { model } from 'utils';
import { isNotEmptyString } from 'utils/validation';
import { ROLES } from 'constants';

const NewUserModel = model({
  getDefaultAttributes: () => ({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    role: undefined
  }),

  validators: {
    isEmailValid({ email }) {
      return isNotEmptyString(email);
    },

    isFirstNameValid({ firstName }) {
      return isNotEmptyString(firstName);
    },

    isLastNameValid({ lastName }) {
      return isNotEmptyString(lastName);
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
