import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { List } from 'components/ui';
import PitchesListItem from './PitchesListItem';
import './PitchesList.scss';

class PitchesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitches: PropTypes.array.isRequired
  };

  render() {
    const { className, pitches } = this.props;

    return (
      <List
        className={classNames(
          'pitches-list',
          className
        )}>
        {pitches.map((pitch, index) => (
          <PitchesListItem key={index} pitch={pitch} />
        ))}
      </List>
    );
  }
}

export default BaseComponent(PitchesList);
