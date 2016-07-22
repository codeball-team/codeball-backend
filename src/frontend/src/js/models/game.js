import _ from 'underscore';
import moment from 'moment';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  DATE_FORMAT, TIME_FORMAT,
  javaToUnixTimestamp
} from 'constants';

export default class GameModel {
  constructor(attributes = {}) {
    _.extend(this, _({ ...attributes }).defaults({
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
      teamA: [],
      teamAScore: undefined,
      teamB: [],
      teamBScore: undefined
    }));
  }

  static fromServerFormat(serverResponse) {
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
      teamAScore: serverResponse.teamAScore,
      teamA: [...serverResponse.teamAIds],
      teamBScore: serverResponse.teamBScore,
      teamB: [...serverResponse.teamBIds]
    });
  }

  static example() {
    return new GameModel({
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
}
