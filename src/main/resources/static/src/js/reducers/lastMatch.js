import _ from 'underscore';
import moment from 'moment';
import { reducer } from 'utils';

const pitchTypes = {
  1: 'Firm Ground',
  2: 'Hard Ground',
  3: 'Artificial Hard',
  4: 'Artificial Soft (Turf)',
  5: 'Indoor'
};

const initialState = {
  date: moment('2016-05-04 19:00', 'YYYY-MM-DD HH:mm').format('YYYY/MM/DD'),
  time: moment('2016-05-04 19:00', 'YYYY-MM-DD HH:mm').format('HH:mm'),
  duration: moment.duration(1.5, 'hours').as('minutes'),
  pitch: {
    id: 1,
    name: 'Boisko - ul. Św. Filipa',
    type: pitchTypes[3],
    address: 'ul. Św. Filipa 15, Kraków',
    url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
    minNumberOfPlayers: 8,
    maxNumberOfPlayers: 12
  },
  isEnrollmentOver: true,
  enrolledUsers: {
    yes: [4, 3],
    no: [2],
    maybe: [1]
  },
  teamA: [2, 3],
  teamAScore: 6,
  teamB: [1, 4],
  teamBScore: 12
};

export default reducer(initialState);
