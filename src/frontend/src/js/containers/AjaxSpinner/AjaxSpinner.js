import React, { Component, PropTypes } from 'react';
import { ContainerComponent } from 'components/base';
import { Spinner } from 'components/ui';

class AjaxSpinner extends Component {
  static propTypes = {
    numberOfPendingRequests: PropTypes.number.isRequired
  };

  render() {
    const { numberOfPendingRequests } = this.props;

    return (
      <Spinner
        placement="fixed"
        show={numberOfPendingRequests > 0} />
    );
  }
}

export default ContainerComponent(AjaxSpinner, state => ({
  numberOfPendingRequests: state.ajaxRequests.numberOfPendingRequests
}));
