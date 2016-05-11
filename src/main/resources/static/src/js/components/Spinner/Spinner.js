import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconLoad from 'react-icons/lib/io/load-d';
import './Spinner.scss';

export default class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.oneOf(['fixed', 'relative']),
    show: PropTypes.bool.isRequired
  };

  render() {
    const {
      className,
      placement,
      show
    } = this.props;

    return (
      <div
        className={classNames(
          'spinner',
          placement,
          {
            visible: show
          },
          className
        )}>
        <IconLoad className="spinner-image" />
      </div>
    );
  }
}
