import React, { useState } from 'react';
import  {Todo} from '../types';


interface NewTodoProps {
  onTodoAdded: (todo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title);
    const todoPost= {title:title}
    const response = await fetch('/api/custom_plugin/todo', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8", "osd-xsrf": "true"
      },
      body: JSON.stringify( todoPost ),
    });

    if (response.ok) {
      const newTodo = await response.json();
      onTodoAdded(newTodo);
      setTitle('');
    }
  };

  return (
    <div>
      <h2>New Todo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default NewTodo;
