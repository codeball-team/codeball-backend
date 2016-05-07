import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { Menu, MatchInfo, MatchEnrollment, MatchEnrollmentForm, MatchLineup } from 'components';
import './UpcomingMatch.scss';

class UpcomingMatch extends Component {
  static propTypes = {
    upcomingMatch: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.loadUsers();
  };

  render () {
    const {
      upcomingMatch,
      users,
      actions
    } = this.props;

    const {
      dateTime,
      duration,
      pitch,
      enrolledUsers,
      teamA,
      teamAScore,
      teamB,
      teamBScore
    } = upcomingMatch;

    return (
      <section className="upcoming-match">
        <MatchInfo
          dateTime={dateTime}
          duration={duration}
          pitchName={pitch.name}
          pitchType={pitch.type}
          pitchAddress={pitch.address}
          pitchUrl={pitch.url}
          pitchMinNumberOfPlayers={pitch.minNumberOfPlayers}
          pitchMaxNumberOfPlayers={pitch.maxNumberOfPlayers} />

        <MatchEnrollmentForm />

        <MatchEnrollment
          users={users}
          enrolledUsers={enrolledUsers} />

        <MatchLineup
          users={users}
          teamA={teamA}
          teamB={teamB} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    upcomingMatch: state.upcomingMatch,
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
