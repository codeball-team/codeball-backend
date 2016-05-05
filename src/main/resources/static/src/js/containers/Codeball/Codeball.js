import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { HelloWorld } from 'components';
import './Codeball.scss';

class Codeball extends Component {
  static propTypes = {
    saidHello: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    const {
      saidHello,
      actions
    } = this.props;

    return (
      <div>
        <HelloWorld
          saidHello={saidHello}
          sayHello={actions.sayHello} />
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
)(Codeball);
