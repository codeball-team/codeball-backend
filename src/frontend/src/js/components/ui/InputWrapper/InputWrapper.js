import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import { Icon } from 'components/ui';
import Value from './Value';
import './InputWrapper.scss';

class InputWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isValid: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string
  };

  render() {
    const {
      children,
      className,
      isValid,
      label,
      value
    } = this.props;

    return (
      <div
        className={classNames(
          'input-wrapper',
          className
        )}>
        <div className="label">
          <div className="title">
            {label}<Value renderWhen={isValid} value={value} />
          </div>

          <div
            className={classNames(
              'validation',
              {
                valid: isValid,
                invalid: !isValid
              }
            )}>
            <Icon name="save" renderWhen={isValid} />
            <Icon name="cancel" renderWhen={!isValid} />
          </div>
        </div>

        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

export default ConditionalRender(InputWrapper);
