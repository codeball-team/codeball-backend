import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './Section.scss';

export default class Section extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    title: PropTypes.string
  };

  render() {
    const {
      className,
      children,
      title
    } = this.props;

    return (
      <div
        className={classNames(
          'section',
          className
        )}>
        {title && (
          <div className="section-title">
            {title}
          </div>
        )}

        {children}
      </div>
    );
  }
}
