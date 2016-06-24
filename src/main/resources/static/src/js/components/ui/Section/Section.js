import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconEdit from 'react-icons/lib/io/ios-compose-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import './Section.scss';

export default function SectionDecorator(ChildComponent) {
  return class Section extends Component {
    static propTypes = {
      title: PropTypes.node.isRequired,
      isEditable: PropTypes.bool,
      isEditing: PropTypes.bool,
      onEdit: PropTypes.func,
      onSave: PropTypes.func,
      onCancel: PropTypes.func
    };

    static defaultProps = {
      isEditable: false,
      isEditing: false,
      onEdit: _.noop,
      onSave: _.noop,
      onCancel: _.noop
    };

    onEditClick = (event) => {
      const { onEdit } = this.props;
      event.preventDefault();
      onEdit();
    };

    onSaveClick = (event) => {
      const { onSave } = this.props;
      event.preventDefault();
      onSave();
    };

    onCancelClick = (event) => {
      const { onCancel } = this.props;
      event.preventDefault();
      onCancel();
    };

    render() {
      const {
        title,
        isEditable,
        isEditing
      } = this.props;

      const childProps = {
        ..._(this.props).omit(_(Section.propTypes).keys()),
        isEditing
      };

      return (
        <div className="section">
          <div className="section-title">
            <span>
              {title}
            </span>

            {isEditable && (
              <div className="section-editable">
                {!isEditing && (
                  <a href="#" onClick={this.onEditClick}>
                    <IconEdit className="icon" />
                    edit
                  </a>
                )}

                {isEditing && (
                  <span>
                    <a href="#" onClick={this.onCancelClick}>
                      <IconCancel className="icon" />
                      cancel
                    </a>
                    <a href="#" onClick={this.onSaveClick}>
                      <IconSave className="icon" />
                      save
                    </a>
                  </span>
                )}
              </div>
            )}
          </div>

          <ChildComponent {...childProps} />
        </div>
      );
    }
  };
}
