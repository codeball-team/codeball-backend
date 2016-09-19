import React, { Component, PropTypes } from 'react';
import { _, classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Link } from 'components/ui';
import './Button.scss';

class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    redirect: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    isDisabled: false,
    onClick: _.noop
  };

  render() {
    const {
      children,
      className,
      isDisabled,
      redirect,
      onClick
    } = this.props;

    const button = (
      <div
        onClick={onClick}
        className={classNames(
          'button',
          {
            'is-disabled': isDisabled
          },
          className
        )}>
        {children}
      </div>
    );

    if(redirect) {
      return (
        <Link to={redirect}>
          {button}
        </Link>
      );
    }

    return button;
  }
}

export default BaseComponent(Button);
