import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Button } from 'components/ui';

class Error extends Component {
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
            <span className="icon">&times;</span>
            <span className="label">Dismiss</span>
          </Button>
        </div>

        <div className="message">
          {message}
        </div>
      </div>
    );
  }
}

export default BaseComponent(Error);
