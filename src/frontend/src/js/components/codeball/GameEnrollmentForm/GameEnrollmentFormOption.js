import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Button } from 'components/ui';

class GameEnrollmentFormOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    inactive: PropTypes.bool,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { value, onClick } = this.props;
    onClick(value);
  };

  render() {
    const { className, inactive, text } = this.props;

    return (
      <Button
        onClick={this.onClick}
        className={classNames(
          'option',
          className,
          {
            inactive
          }
        )}>
        {text}
      </Button>
    );
  }
}

export default BaseComponent(GameEnrollmentFormOption);
