import React, { Component, PropTypes } from 'react';
import AjaxSpinner from 'containers/AjaxSpinner/AjaxSpinner';
import { Page } from 'components/ui';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Page>
          {children}
        </Page>
        <AjaxSpinner />
      </div>
    );
  }
}
