import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { ButtonSave } from 'components/ui';

class SubmitButton extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { isDisabled, onClick } = this.props;

    return (
      <div className="submit-button-container">
        <ButtonSave
          className="submit-button"
          isDisabled={isDisabled}
          onClick={onClick} />
      </div>
    );
  }
}

export default BaseComponent(SubmitButton);
