import _ from 'underscore';
import moment from 'moment';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  DATE_FORMAT, TIME_FORMAT,
  javaToUnixTimestamp
} from 'constants';

export default function Game(game) {
  return _({ ...game }).defaults({
    date: undefined,
    time: undefined,
    duration: undefined,
    pitchId: undefined,
    isEnrollmentOver: undefined,
    isGameOver: undefined,
    enrolledUsers: {
      [ENROLLMENT_STATUS_YES]: [],
      [ENROLLMENT_STATUS_MAYBE]: [],
      [ENROLLMENT_STATUS_NO]: []
    },
    teamA: [],
    teamAScore: undefined,
    teamB: [],
    teamBScore: undefined
  });
}

export function mapGame(game) {
  const enrolledUsers = _(game.enrollmentIds || {}).reduce(
    (sum, enrollmentStatus, userId) => {
      sum[enrollmentStatus].push(Number(userId));
      return sum;
    },

    Game().enrolledUsers
  );

  const date = moment(javaToUnixTimestamp(game.startTimestamp));

  return Game({
    id: game.id,
    date: date.format(DATE_FORMAT),
    time: date.format(TIME_FORMAT),
    duration: game.durationInMinutes,
    pitchId: game.pitchId,
    isEnrollmentOver: game.isEnrollmentOver,
    isGameOver: game.isGameOver,
    enrolledUsers,
    teamAScore: game.teamAScore,
    teamA: [...game.teamAIds],
    teamBScore: game.teamBScore,
    teamB: [...game.teamBIds]
  });
}

export function gameExample() {
  return Game({
    id: 1,
    date: '2016/06/01',
    time: '19:00',
    duration: 90,
    pitchId: 1,
    isEnrollmentOver: true,
    isGameOver: true,
    enrolledUsers: {
      [ENROLLMENT_STATUS_YES]: [1],
      [ENROLLMENT_STATUS_MAYBE]: [],
      [ENROLLMENT_STATUS_NO]: []
    },
    teamAScore: 13,
    teamA: [],
    teamBScore: 7,
    teamB: [1]
  });
}
