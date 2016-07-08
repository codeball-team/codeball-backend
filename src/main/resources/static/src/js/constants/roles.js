import _ from 'underscore';

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

export const ROLE_STRING = {
  [ROLE_ADMIN]: 'Admin',
  [ROLE_USER]: 'User'
};

export const ROLES = _(ROLE_STRING).keys();

export const ROLE_OPTIONS = ROLES.map(role => ({
  label: `${ROLE_STRING[role]}`,
  value: role
}));

export const PERMISSION_CLOSE_ENROLMENT = 'PERMISSION_CLOSE_ENROLMENT';
export const PERMISSION_DRAW_TEAMS = 'PERMISSION_DRAW_TEAMS';
export const PERMISSION_END_GAME = 'PERMISSION_END_GAME';

export const ROLES_PERMISSIONS = {
  [ROLE_ADMIN]: {
    [PERMISSION_CLOSE_ENROLMENT]: true,
    [PERMISSION_DRAW_TEAMS]: true,
    [PERMISSION_END_GAME]: true
  },

  [ROLE_USER]: {
    [PERMISSION_CLOSE_ENROLMENT]: false,
    [PERMISSION_DRAW_TEAMS]: false,
    [PERMISSION_END_GAME]: false
  }
};
