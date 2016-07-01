import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as codeballActions from 'actions';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { PlayersListSection } from 'components/sections';

class Players extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.currentUserLoad();
    actions.usersLoad();
  };

  render () {
    const {
      currentUserData,
      usersData
    } = this.props;

    const { currentUser } = currentUserData;
    const { users } = usersData;
    const numberOfUsers = _(users).keys().length;

    const isContentLoading = _.any([
      currentUserData.isLoading,
      usersData.isLoading
    ]);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="players">
            <PlayersListSection
              title={`Players (${numberOfUsers})`}
              currentUser={currentUser}
              users={_(users).values()}
              buttons={[
                <Link key="new" to="players/new">
                  <Button>
                    <IconAdd className="icon" />
                    <span className="label">Add</span>
                  </Button>
                </Link>
              ]} />
          </section>
        )} />
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
    actions: bindActionCreators(codeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
