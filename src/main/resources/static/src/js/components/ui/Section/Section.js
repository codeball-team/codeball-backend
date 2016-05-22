import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import './Section.scss';

export default function SectionDecorator(ChildComponent) {
  return class Section extends Component {
    static propTypes = {
      className: PropTypes.string,
      title: PropTypes.string.isRequired,
      isEditable: PropTypes.bool,
      isEditing: PropTypes.bool,
      onEdit: PropTypes.func,
      onSave: PropTypes.func,
      onCancel: PropTypes.func
    };

    static defaultProps = {
      className: '',
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
        className,
        title,
        isEditable,
        isEditing
      } = this.props;

      const childProps = {
        ..._(this.props).omit(_(Section.propTypes).keys()),
        isEditing
      };

      return (
        <div
          className={classNames(
            'section',
            className
          )}>
          <div className="section-title">
            <span>
              {title}
            </span>

            {isEditable && (
              <div className="section-editable">
                {!isEditing && (
                  <a href="#" onClick={this.onEditClick}>
                    edit
                  </a>
                )}

                {isEditing && (
                  <span>
                    <a href="#" onClick={this.onCancelClick}>
                      cancel
                    </a>

                    <a href="#" onClick={this.onSaveClick}>
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
