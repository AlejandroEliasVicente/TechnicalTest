import React from 'react';
import { EuiButtonIcon } from '@elastic/eui';

interface DeleteTodoProps {
  todoId: number;
  onDelete: (todoId: number) => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/custom_plugin/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'osd-xsrf': 'true',
        },
      });

      if (response.ok) {
        onDelete(todoId);
      } else {
        console.error('Error deleting todo:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <EuiButtonIcon
      iconType="trash"
      color="danger"
      aria-label="Delete"
      onClick={handleDelete}
    />
  );
};

export default DeleteTodo;
