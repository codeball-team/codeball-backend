import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import { ButtonAddGame } from 'components/codeball';
import './GameNotLoaded.scss';

class GameNotLoaded extends Component {
  static propTypes = {
    canAddNewGame: PropTypes.bool,
    className: PropTypes.string
  };

  render() {
    const {
      canAddNewGame,
      className
    } = this.props;

    return (
      <div
        className={classNames(
          'game-not-loaded',
          className
        )}>
        <ButtonAddGame renderWhen={canAddNewGame} />
      </div>
    );
  }
}

export default ConditionalRender(GameNotLoaded);
