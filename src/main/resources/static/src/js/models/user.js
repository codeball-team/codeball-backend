import _ from 'underscore';

export default function User(user) {
  return _({ ...user }).defaults({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    pictureUrl: '',
    role: ''
  });
}

export function mapUser(serverResponse) {
  return User({
    id: serverResponse.id,
    email: serverResponse.email,
    firstName: serverResponse.firstName,
    lastName: serverResponse.lastName,
    role: serverResponse.role,
    pictureUrl: serverResponse.pictureUrl
  });
}

export function userExample() {
  return User({
    id: 1,
    firstName: 'Codeball',
    lastName: 'Developer',
    email: 'development@codeball.com',
    pictureUrl: '',
    role: 'ROLE_ADMIN'
  });
}
