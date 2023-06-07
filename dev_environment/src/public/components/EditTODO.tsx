import React, { useState } from 'react';
import {
  EuiButtonIcon,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
} from '@elastic/eui';
import { Todo } from '../types';

interface EditTodoProps {
  todo: Todo;
  onUpdateTodo: (title: string) => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onUpdateTodo }) => {

  const [title, setTitle] = useState(todo.title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(`/api/custom_plugin/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'osd-xsrf': 'true',
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      if (response.ok) {
        onUpdateTodo(title);
      } else {
        console.error('Error updating todo:', response.status);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <EuiPopover
        button={
          <EuiButtonIcon
            iconType="pencil"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            aria-label="Edit"
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        ownFocus
        initialFocus="[name=title]"
      >
        <div style={{ padding: '16px' }}>
          <EuiForm>
            <EuiFormRow label="Title">
              <EuiFieldText name="title" value={title} onChange={handleTitleChange} />
            </EuiFormRow>
            <EuiSpacer size="s" />
            <EuiButton onClick={() => setIsPopoverOpen(false)}>Cancel</EuiButton>
            <EuiButton fill onClick={handleUpdateTodo}>
              Save
            </EuiButton>
          </EuiForm>
        </div>
      </EuiPopover>
    </>
  );

};

export default EditTodo;
