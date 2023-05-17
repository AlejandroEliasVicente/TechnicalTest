import React from 'react';

interface DeleteTodoProps {
  todoId: number;
  onDelete: () => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch(`/api/custom_plugin/todo/${todoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete();
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteTodo;
