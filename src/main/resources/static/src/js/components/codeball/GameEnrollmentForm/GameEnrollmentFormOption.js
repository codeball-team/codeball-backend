import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'components/ui';

export default class GameEnrollmentFormOption extends Component {
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
    const {
      className,
      inactive,
      text
    } = this.props;

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
