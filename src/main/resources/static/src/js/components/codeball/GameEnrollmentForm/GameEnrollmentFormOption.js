import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'components/ui';

export default class GameEnrollmentFormOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    inactive: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      inactive,
      text,
      onClick
    } = this.props;

    return (
      <Button
        onClick={() => onClick()}
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
