import { model } from 'utils';

const UserModel = model({
  defaultAttributes: () => ({
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    pictureUrl: undefined,
    role: undefined
  }),
  fromServerFormat(serverResponse) {
    if (!serverResponse) {
      return new UserModel();
    }

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
