import { _, javaToUnixTimestamp, model, moment } from 'utils';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  DATE_FORMAT, TIME_FORMAT
} from 'constants';

const GameModel = model({
  defaultAttributes: () => ({
    date: '1970/01/01',
    time: '00:00',
    duration: 0,
    pitchId: undefined,
    isEnrollmentOver: undefined,
    isGameOver: undefined,
    enrolledUsers: {
      [ENROLLMENT_STATUS_YES]: [],
      [ENROLLMENT_STATUS_MAYBE]: [],
      [ENROLLMENT_STATUS_NO]: []
    },
    enrolledUsersIds: [],
    teamA: [],
    teamAScore: undefined,
    teamB: [],
    teamBScore: undefined
  }),

  fromServerFormat(serverResponse) {
    if (!serverResponse) {
      return new GameModel();
    }

    const enrolledUsers = _(serverResponse.enrollments || []).reduce(
      (sum, enrollment) => {
        const { enrollmentStatus, userId } = enrollment;
        sum[enrollmentStatus].push(Number(userId));
        return sum;
      },

      new GameModel().enrolledUsers
    );
    const enrolledUsersIds = _(serverResponse.enrollments).pluck('userId');
    const date = moment(javaToUnixTimestamp(serverResponse.startTimestamp));

    return new GameModel({
      id: serverResponse.id,
      date: date.format(DATE_FORMAT),
      time: date.format(TIME_FORMAT),
      duration: serverResponse.durationInMinutes,
      pitchId: serverResponse.pitchId,
      isEnrollmentOver: serverResponse.isEnrollmentOver,
      isGameOver: serverResponse.isGameOver,
      enrolledUsers,
      enrolledUsersIds,
      teamAScore: serverResponse.teamAScore,
      teamA: [...serverResponse.teamAIds],
      teamBScore: serverResponse.teamBScore,
      teamB: [...serverResponse.teamBIds]
    });
  }
});

export default GameModel;
