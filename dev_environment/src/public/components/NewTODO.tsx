import React, { useState } from 'react';
import { EuiFieldText, EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { Todo } from '../types';

interface NewTodoProps {
  onTodoAdded: (todo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const todoPost = { title: title };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title);

    const response = await fetch('/api/custom_plugin/newtodo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'osd-xsrf': 'true',
      },
      body: JSON.stringify(todoPost),
    });

    if (response.ok) {
      const newTodo = await response.json();
      onTodoAdded(newTodo.newTodo);
      setTitle('');
    }
  };

  return (
    <div>
      <h2>New Todo</h2>
      <form onSubmit={handleSubmit}>
        <EuiFlexGroup responsive={false} alignItems="center">
          <EuiFlexItem>
            <EuiFieldText value={title} onChange={handleTitleChange} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon type="submit" iconType="plusInCircleFilled" aria-label="Add Todo" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </form>
    </div>
  );
};

export default NewTodo;

