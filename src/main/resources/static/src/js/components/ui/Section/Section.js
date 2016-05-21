import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './Section.scss';

export default class Section extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    title: PropTypes.string.isRequired
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
        <div className="section-title">
          {title}
        </div>

        {children}
      </div>
    );
  }
}
