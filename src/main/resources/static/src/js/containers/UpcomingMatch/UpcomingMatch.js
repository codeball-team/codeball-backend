import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { MatchInfo, MatchEnrollment, MatchEnrollmentForm, MatchLineup } from 'components';
import './UpcomingMatch.scss';

class UpcomingMatch extends Component {
  static propTypes = {
    gameData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData
    } = this.props;

    refreshDataIfNecessary(usersData, actions.loadUsers);
    actions.loadGame(2);
  };

  render () {
    const {
      gameData,
      usersData,
      actions
    } = this.props;

    const { game } = gameData;
    const { users } = usersData;

    const {
      date,
      time,
      duration,
      pitch,
      isEnrollmentOver,
      enrolledUsers,
      teamA,
      teamAScore,
      teamB,
      teamBScore
    } = game;

    return (
      <section className="upcoming-match">
        <MatchInfo
          date={date}
          time={time}
          duration={duration}
          pitchName={pitch.name}
          pitchType={pitch.type}
          pitchAddress={pitch.address}
          pitchUrl={pitch.url}
          pitchMinNumberOfPlayers={pitch.minNumberOfPlayers}
          pitchMaxNumberOfPlayers={pitch.maxNumberOfPlayers} />

        {!isEnrollmentOver && (
          <MatchEnrollmentForm />
        )}

        {isEnrollmentOver && (
          <MatchLineup
            users={users}
            teamA={teamA}
            teamB={teamB} />
        )}

        <MatchEnrollment
          users={users}
          enrolledUsers={enrolledUsers} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameData: state.gameData,
    usersData: state.usersData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CodeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingMatch);
