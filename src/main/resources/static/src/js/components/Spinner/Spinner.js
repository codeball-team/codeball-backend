import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconLoad from 'react-icons/lib/io/load-d';
import './Spinner.scss';

export default class Spinner extends Component {
  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool.isRequired
  };

  render() {
    const {
      className,
      show
    } = this.props;

    return (
      <div
        className={classNames(
          'spinner',
          className
        )}
        style={{
          display: show ? 'block' : 'none'
        }}>
        <IconLoad className="spinner-image" />
      </div>
    );
  }
}
