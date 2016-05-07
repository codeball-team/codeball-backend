import moment from 'moment';
import { SAY_HELLO } from 'constants/ActionTypes';

const pitchTypes = {
  1: 'Firm Ground',
  2: 'Hard Ground',
  3: 'Artificial Hard',
  4: 'Artificial Soft (Turf)',
  5: 'Indoor'
};

const initialState = {
  dateTime: moment('2016-05-11 19:00', 'YYYY-MM-DD HH:mm'),
  duration: moment.duration(1.5, 'hours'),
  pitch: {
    id: 1,
    name: 'Boisko - ul. Św. Filipa',
    type: pitchTypes[3],
    address: 'ul. Św. Filipa 15, Kraków',
    url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
    minNumberOfPlayers: 8,
    maxNumberOfPlayers: 12
  },
  isEnrollmentOver: false,
  enrolledUsers: {
    yes: [1, 2],
    no: [4],
    maybe: [3]
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
