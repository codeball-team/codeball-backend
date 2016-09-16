import { IconButton } from 'components/ui';

export const ButtonAddGame = IconButton({
  icon: 'add',
  label: 'Add',
  redirect: '/games/new'
});

export const ButtonAddPitch = IconButton({
  icon: 'add',
  label: 'Add',
  redirect: '/pitches/new'
});

export const ButtonAddUser = IconButton({
  icon: 'add',
  label: 'Add',
  redirect: '/players/new'
});
