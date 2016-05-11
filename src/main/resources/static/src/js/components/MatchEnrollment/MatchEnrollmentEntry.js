import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class MatchEnrollmentEntry extends Component {
  static propTypes = {
    className: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    enrollmentStatus: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      firstName,
      lastName,
      enrollmentStatus
    } = this.props;

    return (
      <div
        className={classNames(
          'match-enrollment-entry',
          className
        )}>
        <div className="name">
          {firstName} {lastName}
        </div>
         <div className="enrollment-status">
          {enrollmentStatus}
        </div>
      </div>
    );
  }
}
