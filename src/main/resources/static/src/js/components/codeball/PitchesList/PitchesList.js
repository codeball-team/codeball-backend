import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { sortByMany } from 'utils';
import { List } from 'components/ui';
import PitchesListItem from '../PitchesListItem/PitchesListItem';

export default class PitchesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitches: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      pitches
    } = this.props;

    const sortedPitches = sortByMany(pitches, 'name');

    return (
      <List
        className={classNames(
          'pitches-list',
          className
        )}>
        {sortedPitches.map(pitch => {
          const { id } = pitch;

          return (
            <PitchesListItem key={id} pitch={pitch} />
          );
        })}
      </List>
    );
  }
}
