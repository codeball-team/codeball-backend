import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { safeGet } from 'utils';
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
    if (safeGet(newProps, 'params.userId') !== safeGet(this.props, 'params.userId')) {
      this.updateData();
    }
  };

  updateData = () => {
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
      firstName,
      lastName
    } = user;

    const isContentLoading = _.any([
      usersData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section className="player">
          <PlayerProfileSection
            title={`${firstName} ${lastName}`}
            user={user} />
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
