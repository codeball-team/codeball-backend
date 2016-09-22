import { model } from 'utils';

const UserModel = model({
  getDefaultAttributes: () => ({
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    pictureUrl: undefined,
    role: 'ROLE_USER'
  }),

  fromServerFormat(serverResponse) {
    return new UserModel({
      id: serverResponse.id,
      email: serverResponse.email,
      firstName: serverResponse.firstName,
      lastName: serverResponse.lastName,
      role: serverResponse.role,
      pictureUrl: serverResponse.pictureUrl
    });
  }
});

export default UserModel;
