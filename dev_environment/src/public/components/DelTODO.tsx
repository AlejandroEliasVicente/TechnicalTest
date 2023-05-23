import React from 'react';

interface DeleteTodoProps {
  todoId: number;
  onDelete: () => void;
  openSearchClient: any; // Agrega esta prop para recibir el cliente de OpenSearch
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete, openSearchClient }) => {
  const handleDelete = async () => {
    try {
      await openSearchClient.delete({
        index: 'todos',
        id: todoId.toString(),
      });

      onDelete();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteTodo;
