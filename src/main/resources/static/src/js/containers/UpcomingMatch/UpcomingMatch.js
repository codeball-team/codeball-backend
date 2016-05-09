import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import {
  Menu, MatchInfo, MatchEnrollment, MatchEnrollmentForm, MatchLineup, MatchScore
} from 'components';
import './UpcomingMatch.scss';

class UpcomingMatch extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.loadUsers();
  };

  render () {
    const {
      game,
      users,
      actions
    } = this.props;

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
    game: state.game,
    users: state.users
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
