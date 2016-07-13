import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { Spinner } from 'components/ui';

class AjaxSpinner extends Component {
  static propTypes = {
    ajaxRequests: PropTypes.number.isRequired
  };

  render() {
    const { ajaxRequests } = this.props;

    return (
      <Spinner
        placement="fixed"
        show={ajaxRequests > 0} />
    );
  }
}

export default bindActionsAndConnect(AjaxSpinner, state => ({
  ajaxRequests: state.ajaxRequests
}));
