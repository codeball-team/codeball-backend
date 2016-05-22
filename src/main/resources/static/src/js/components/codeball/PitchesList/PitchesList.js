import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { List, Section } from 'components/ui';
import PitchesListItem from '../PitchesListItem/PitchesListItem';

export default class PitchesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    pitches: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      title,
      pitches
    } = this.props;

    return (
      <Section
        title={title}
        className={className}>
        <List className="pitches-list">
          {_(pitches).map(pitch => {
            const { id } = pitch;

            return (
              <PitchesListItem key={id} pitch={pitch} />
            );
          })}
        </List>
      </Section>
    );
  }
}
