import React, { useState } from 'react';
import { Todo } from '../types';

interface EditTodoProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onUpdateTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleIsCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
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
          isCompleted: isCompleted,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onUpdateTodo(updatedTodo.updatedTodo);
      } else {
        console.error('Error updating todo:', response.status);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Completed:
        <input type="checkbox" checked={isCompleted} onChange={handleIsCompletedChange} />
      </label>
      <br />
      <button onClick={handleUpdateTodo}>Update</button>
    </div>
  );
};

export default EditTodo;
