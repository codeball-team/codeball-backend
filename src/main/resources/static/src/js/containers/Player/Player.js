import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { safeGet } from 'utils';
import { LoadableContent }  from 'components/ui';
import { PlayerProfile }  from 'components/codeball';

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    this.updateData(this.props);
  };

  componentWillReceiveProps = (newProps) => {
    if (safeGet(newProps, 'params.userId') !== safeGet(this.props, 'params.userId')) {
      this.updateData(newProps);
    }
  };

  updateData = (props) => {
    const { actions } = this.props;
    actions.loadUsers();
  };

  render () {
    const {
      usersData,
      params
    } = this.props;
    const { users } = usersData;
    const user = users[params.userId];
    const {
      id,
      firstName,
      lastName,
      email,
      pictureUrl,
      role
    } = user;

    const isContentLoading = _.any([
      usersData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section className="player">
          <PlayerProfile
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            pictureUrl={pictureUrl}
            role={role} />
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(Player);