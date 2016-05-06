import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const SIZE = 20;
const ICONS = require('./icons.json');

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    pathClassName: PropTypes.string
  };

  render() {
    const {
      className,
      pathClassName,
      name
    } = this.props;

    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={`${SIZE}`}
        height={`${SIZE}`}
        viewBox="0 0 80 80"
        className={className}>
        <path
          d={ICONS[name]}
          className={classNames(
            'icon',
            pathClassName
          )}></path>
      </svg>

    );
  }
}
