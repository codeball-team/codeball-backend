import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { safeGet } from 'utils';
import * as codeballActions from 'actions';
import { LoadableContent } from 'components/ui';
import { PlayerProfileSection } from 'components/sections';

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    this.updateData();
  };

  componentWillReceiveProps = (newProps) => {
    const userIdPath = ['params', 'userId'];
    if (safeGet(newProps, userIdPath) !== safeGet(this.props, userIdPath)) {
      this.updateData();
    }
  };

  updateData = () => {
    const { actions: { usersLoad } } = this.props;
    usersLoad();
  };

  render () {
    const {
      params: {
        userId
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    const { [userId]: user } = users;
    const { firstName, lastName } = user;

    return (
      <LoadableContent
        isLoading={areUsersLoading}
        render={() => (
          <section className="player">
            <PlayerProfileSection
              title={`${firstName} ${lastName}`}
              user={user} />
          </section>
        )} />
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
    actions: bindActionCreators(codeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
