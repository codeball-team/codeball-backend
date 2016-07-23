import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';

export default class Errors extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.object.isRequired,
    errorIndex: PropTypes.number.isRequired,
    onErrorAcknowledge: PropTypes.func.isRequired
  };

  onErrorAcknowledge = event => {
    const { onErrorAcknowledge, errorIndex } = this.props;
    event.preventDefault();
    onErrorAcknowledge(errorIndex);
  };

  render() {
    const {
      className,
      error: {
        title,
        message
      }
    } = this.props;

    return (
      <div
        className={classNames(
          'error',
          className
        )}>
        <div className="header">
          <div className="title ellipsis">
            {title}
          </div>

          <Button className="dismiss" onClick={this.onErrorAcknowledge}>
            &times; Dismiss
          </Button>
        </div>

        <div className="message">
          {message}
        </div>
      </div>
    );
  }
}
