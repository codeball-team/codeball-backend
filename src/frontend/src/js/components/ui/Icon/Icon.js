import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import icons from 'components/ui/icons';

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

export default ConditionalRender(Icon);
