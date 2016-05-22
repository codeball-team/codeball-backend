import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { List } from 'components/ui';
import PitchesListItem from '../PitchesListItem/PitchesListItem';

export default class PitchesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitches: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      pitches
    } = this.props;

    return (
      <List
        className={classNames(
          'pitches-list',
          className
        )}>
        {_(pitches).map(pitch => {
          const { id } = pitch;

          return (
            <PitchesListItem key={id} pitch={pitch} />
          );
        })}
      </List>
    );
  }
}
