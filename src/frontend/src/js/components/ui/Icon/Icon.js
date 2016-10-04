import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import icons from 'components/ui/icons';
import './Icon.scss';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  render() {
    const { className, name, ...restProps } = this.props;
    const IconComponent = icons[name];

    return (
      <IconComponent
        {...restProps}
        className={classNames(
          'icon',
          className
        )} />
    );
  }
}

export default BaseComponent(Icon);
