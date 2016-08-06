import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Button, Icon } from 'components/ui';
import './IconButton.scss';

export default function IconButtonDecorator(props) {
  const {
    icon: defaultIcon,
    label: defaultLabel,
    ...defaultProps
  } = props;

  class IconButton extends Component {
    static propTypes = {
      icon: PropTypes.string,
      label: PropTypes.string
    };

    static defaultProps = {
      icon: defaultIcon,
      label: defaultLabel
    };

    render() {
      const { icon, label, ...restProps } = this.props;
      const buttonProps = { ...defaultProps, ...restProps };

      return (
        <Button {...buttonProps}>
          <Icon name={icon} />
          <span className="label">{label}</span>
        </Button>
      );
    }
  }

  return BaseComponent(IconButton);
}
