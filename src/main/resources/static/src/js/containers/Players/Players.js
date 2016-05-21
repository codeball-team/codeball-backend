import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { LoadableContent, PlayersList } from 'components';

class Players extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.loadCurrentUser();
    actions.loadUsers();
  };

  render () {
    const {
      currentUserData,
      usersData
    } = this.props;

    const { currentUser } = currentUserData;
    const { users } = usersData;

    const isContentLoading = _.any([
      currentUserData.isLoading,
      usersData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section className="players">
          {_(users).keys().length > 0 && (
            <PlayersList
              title="Players"
              currentUser={currentUser}
              users={users} />
          )}
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserData: state.currentUserData,
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
)(Players);
