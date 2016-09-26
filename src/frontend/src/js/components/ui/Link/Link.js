import React, { cloneElement, Component, PropTypes } from 'react';
import { _ } from 'utils';
import './Link.scss';

export default class Link extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node
    ]),
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    onClick: _.noop
  };

  render() {
    const {
      children,
      to,
      onClick
    } = this.props;

    if(!children) {
      return null;
    }

    const { type } = children;
    const onClickCallback = (...args) => {
      this.context.router.push(to);
      onClick(...args);
    };

    if(!type) {
      return (
        <a className="link" onClick={onClickCallback}>
          {children}
        </a>
      );
    }

    return cloneElement(children, {
      onClick: onClickCallback
    });
  }
}
