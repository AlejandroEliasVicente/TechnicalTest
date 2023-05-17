import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface TodoListProps {
  todoList: Todo[];
  onDeleteTodo: (todoId: number) => void;
}

function TodoList({ todoList, onDeleteTodo }: TodoListProps) {
  const handleDeleteTodo = (todoId: number) => {
    onDeleteTodo(todoId);
  };

  return (
    <div>
      <h1>TO-DO List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.isCompleted ? 'completed' : 'not completed'}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

