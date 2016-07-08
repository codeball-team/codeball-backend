import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { renderConditionally } from 'utils';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconEdit from 'react-icons/lib/io/ios-compose-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import Button from '../Button/Button';
import ButtonsPanel from '../ButtonsPanel/ButtonsPanel';
import './Section.scss';

export default function SectionDecorator(ChildComponent) {
  return class Section extends Component {
    static propTypes = {
      buttons: PropTypes.node,
      canEdit: PropTypes.bool,
      isEditable: PropTypes.bool,
      isEditing: PropTypes.bool,
      title: PropTypes.node.isRequired,
      onCancel: PropTypes.func,
      onEdit: PropTypes.func,
      onSave: PropTypes.func
    };

    static defaultProps = {
      canEdit: false,
      isEditable: false,
      isEditing: false,
      onCancel: _.noop,
      onEdit: _.noop,
      onSave: _.noop
    };

    render() {
      const {
        buttons,
        canEdit,
        isEditable,
        isEditing,
        title,
        onCancel,
        onEdit,
        onSave
      } = this.props;

      const childProps = {
        ..._(this.props).omit(_(Section.propTypes).keys()),
        isEditing
      };

      return (
        <div className="section">
          <div className="section-bar">
            <div className="section-title ellipsis">
              {title}
            </div>

            <ButtonsPanel>
              {renderConditionally({
                when: canEdit && isEditable,
                render: () => [
                  renderConditionally({
                    when: !isEditing,
                    render: () => (
                      <Button key="edit" onClick={onEdit}>
                        <IconEdit className="icon" />
                        <span className="label">Edit</span>
                      </Button>
                    )
                  }),
                  renderConditionally({
                    when: isEditing,
                    render: () => [
                      <Button key="cancel" onClick={onCancel}>
                        <IconCancel className="icon" />
                        <span className="label">Cancel</span>
                      </Button>,

                      <Button key="save" onClick={onSave}>
                        <IconSave className="icon" />
                        <span className="label">Save</span>
                      </Button>
                    ]
                  })
                ].filter(Boolean)
              })}

              {buttons}
            </ButtonsPanel>
          </div>

          <ChildComponent {...childProps} />
        </div>
      );
    }
  };
}
