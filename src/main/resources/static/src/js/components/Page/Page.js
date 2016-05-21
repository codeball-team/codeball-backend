import React, { Component, PropTypes } from 'react';
import Menu from 'components/Menu/Menu';
import './Page.scss';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    GlobalSpinnerComponent: PropTypes.any.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onBackClick = (event) => {
    const { router } = this.context;
    event.preventDefault();
    router.goBack();
  }

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

            <a href="#" className="back-button" onClick={this.onBackClick}>
              &laquo; back
            </a>
          </div>
        </div>
        <GlobalSpinnerComponent />
      </div>
    );
  }
}
