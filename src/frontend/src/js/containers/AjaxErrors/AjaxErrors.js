import React, { Component, PropTypes } from 'react';
import { Container } from 'components/base';
import { Errors } from 'components/ui';

class AjaxErrors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
  };

  onErrorAcknowledge = errorIndex => {
    const { actions } = this.props;
    actions.ajaxErrorAcknowledge(errorIndex);
  };

  render() {
    const { errors } = this.props;

    return (
      <Errors
        errors={errors}
        onErrorAcknowledge={this.onErrorAcknowledge} />
    );
  }
}

export default Container(AjaxErrors, state => ({
  errors: state.ajaxRequests.errors
}));
