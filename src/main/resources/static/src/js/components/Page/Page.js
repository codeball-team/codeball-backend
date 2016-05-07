import React, { Component } from 'react';
import Menu from 'components/Menu/Menu';
import './Page.scss';

function Page(GlobalSpinnerComponent, ContentComponent) {
  return class Page extends Component {
    render () {
      return (
        <div className="page">
          <Menu className="page-menu" />
          <div className="page-content">
            <ContentComponent />
          </div>
          {GlobalSpinnerComponent}
        </div>
      );
    }
  };
}

export default Page;
