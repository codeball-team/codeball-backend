import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { Menu, HelloWorld } from 'components';

class UpcomingMatch extends Component {
  static propTypes = {
    saidHello: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    const {
      saidHello,
      actions
    } = this.props;

    return (
      <div>
        <h1>Upcoming match</h1>
        <div>
          <div>
            <button onClick={actions.sayHello}>Hello!</button>
          </div>
          <div>
            {`Said hello: ${saidHello}`}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saidHello: state.saidHello
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
