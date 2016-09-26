import { javaToUnixTimestamp, model, moment } from 'utils';
import { DATE_FORMAT, TIME_FORMAT } from 'constants';
import { EnrollmentModel } from 'models';

const GameModel = model({
  getDefaultAttributes: () => ({
    date: '1970/01/01',
    duration: 0,
    enrollments: [],
    id: undefined,
    isEnrollmentOver: undefined,
    isGameOver: undefined,
    pitch: {},
    pitchId: undefined,
    teamA: [],
    teamAScore: undefined,
    teamB: [],
    teamBScore: undefined,
    time: '00:00'
  }),

  fromServerFormat(serverResponse) {
    const date = moment(javaToUnixTimestamp(serverResponse.startTimestamp));

    return new GameModel({
      date: date.format(DATE_FORMAT),
      duration: serverResponse.durationInMinutes,
      enrollments: serverResponse.enrollments.map(EnrollmentModel.fromServerFormat),
      id: serverResponse.id,
      isEnrollmentOver: serverResponse.isEnrollmentOver,
      isGameOver: serverResponse.isGameOver,
      pitchId: serverResponse.pitchId,
      teamA: [...serverResponse.teamAIds],
      teamAScore: serverResponse.teamAScore,
      teamB: [...serverResponse.teamBIds],
      teamBScore: serverResponse.teamBScore,
      time: date.format(TIME_FORMAT)
    });
  }
});

export default GameModel;
