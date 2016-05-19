import React, { Component, PropTypes } from 'react';
import Menu from 'components/Menu/Menu';
import './Page.scss';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    GlobalSpinnerComponent: PropTypes.any.isRequired
  };

  render () {
    const {
      children,
      GlobalSpinnerComponent
    } = this.props;

    return (
      <div className="page">
        <Menu className="page-menu" />
        <div className="page-content-container">
          <div className="page-content">
            {children}
          </div>
        </div>
        <GlobalSpinnerComponent />
      </div>
    );
  }
}
