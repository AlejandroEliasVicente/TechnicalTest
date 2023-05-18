import React from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (todoId: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  const handleDeleteTodo = (todoId: number) => {
    onDeleteTodo(todoId);
  };

  return (
    <div>
      <h1>TO-DO List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.isCompleted ? 'completed' : 'not completed'}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


