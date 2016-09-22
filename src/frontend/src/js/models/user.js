import { model } from 'utils';

const UserModel = model({
  getDefaultAttributes: () => ({
    email: undefined,
    firstName: undefined,
    id: undefined,
    lastName: undefined,
    pictureUrl: undefined,
    role: 'ROLE_USER'
  }),

  fromServerFormat(serverResponse) {
    return new UserModel({
      email: serverResponse.email,
      firstName: serverResponse.firstName,
      id: serverResponse.id,
      lastName: serverResponse.lastName,
      pictureUrl: serverResponse.pictureUrl,
      role: serverResponse.role
    });
  }
});

export default UserModel;
