import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './MatchEnrollmentForm.scss';

export default class MatchEnrollmentForm extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {
      className
    } = this.props;

    return (
      <div
        className={classNames(
          'match-enrollment-form',
          className
        )}>
        <div className="label">
          Are you going?
        </div>

        <div className="options">
          <div className="option yes">
            Yes
          </div>
          <div className="option maybe">
            Maybe
          </div>
          <div className="option no">
            No
          </div>
        </div>
      </div>
    );
  }
}
