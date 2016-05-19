import _ from 'underscore';
import moment from 'moment';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  DATE_FORMAT, TIME_FORMAT
} from 'constants/Configuration';

export default function mapGame(game) {
  const enrolledUsers = _(game.enrollmentIds || {}).reduce(
    (sum, enrollmentStatus, userId) => {
      sum[enrollmentStatus].push(Number(userId));
      return sum;
    },

    {
      [ENROLLMENT_STATUS_YES]: [],
      [ENROLLMENT_STATUS_MAYBE]: [],
      [ENROLLMENT_STATUS_NO]: []
    }
  );

  const startDate = moment(game.startTimestamp * 1000);

  return {
    id: game.id,
    date: startDate.format(DATE_FORMAT),
    time: startDate.format(TIME_FORMAT),
    duration: game.durationInMinutes,
    pitchId: game.pitchId,
    isEnrollmentOver: game.isEnrollmentOver,
    isGameOver: game.isGameOver,
    enrolledUsers,
    teamAScore: game.teamAScore,
    teamA: game.teamAIds,
    teamBScore: game.teamBScore,
    teamB: game.teamBIds
  };
}
