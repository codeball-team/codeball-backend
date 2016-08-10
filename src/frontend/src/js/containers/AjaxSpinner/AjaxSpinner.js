import React, { Component, PropTypes } from 'react';
import { ContainerComponent } from 'components/base';
import { Spinner } from 'components/ui';

class AjaxSpinner extends Component {
  static propTypes = {
    ajaxRequests: PropTypes.object.isRequired
  };

  render() {
    const { ajaxRequests: { numberOfPendingRequests } } = this.props;

    return (
      <Spinner
        placement="fixed"
        show={numberOfPendingRequests > 0} />
    );
  }
}

export default ContainerComponent(AjaxSpinner, state => ({
  ajaxRequests: state.ajaxRequests
}));
