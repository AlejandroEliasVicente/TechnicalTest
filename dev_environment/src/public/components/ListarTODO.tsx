import React from 'react';
import { EuiFlexGrid, EuiFlexItem, EuiText, EuiButtonIcon, EuiFlexGroup, EuiSpacer } from '@elastic/eui';
import { Todo } from '../types';
import DeleteTodo from './DelTODO';
import CompleteTodo from './IsCompleted';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (todoId: number) => void;
  onCompleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onCompleteTodo }) => {
  const handleDeleteTodo = (todoId: number) => {
    onDeleteTodo(todoId);
  };

  const handleCompleteTodo = (todoId: string) => {
    onCompleteTodo(todoId);
  };

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <div>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <h2>Not Completed</h2>
          {uncompletedTodos.map((todo) => (
            <div key={todo.id}>
              <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                <EuiFlexItem>
                  <EuiText>{todo.title}</EuiText>
                  <EuiText color="default" size="s">
                    Not completed
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiFlexGroup gutterSize="s">
                    <EuiFlexItem>
                      <CompleteTodo todoId={todo.id.toString()} onComplete={handleCompleteTodo} />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <DeleteTodo todoId={todo.id} onDelete={handleDeleteTodo} />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
            </div>
          ))}
        </EuiFlexItem>
        <EuiFlexItem>
          <h2>Completed</h2>
          {completedTodos.map((todo) => (
            <div key={todo.id}>
              <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                <EuiFlexItem>
                  <EuiText>{todo.title}</EuiText>
                  <EuiText color="secondary" size="s">
                    Completed
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiFlexGroup gutterSize="s">
                    <EuiFlexItem>
                      <CompleteTodo todoId={todo.id.toString()} onComplete={handleCompleteTodo} />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <DeleteTodo todoId={todo.id} onDelete={handleDeleteTodo} />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
            </div>
          ))}
        </EuiFlexItem>
      </EuiFlexGrid>
    </div>
  );
};

export default TodoList;

