import React, { useState } from 'react';
import { EuiButton, EuiCheckbox } from '@elastic/eui';
import { Todo } from '../types';

interface SetCompletedProps {
    todos: Todo[]; 
    onUpdateTodos: (todos: Todo[]) => void;
  }
  

const SetCompleted: React.FC<SetCompletedProps> = ({ todos, onUpdateTodos }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSetCompleted = async () => {
    setIsLoading(true);
    const todoComp= {ids: todos};
    try {
        const response = await fetch('/api/custom_plugin/todo/completed', {
          method: 'PUT',
          body: JSON.stringify( todoComp ),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
            onUpdateTodos;
        } else {
          console.error('Error setting todos as completed:', response);
        }
      } catch (error) {
        console.error('Error setting todos as completed:', error);
      }
  
      setIsLoading(false);
    };
  return (
    <div>
      <EuiCheckbox
        id="set-completed-checkbox"
        label="Marcar los TODOS seleccionados como completados"
        checked={isChecked}
        disabled={isLoading}
        onChange={handleCheckboxChange}
      />
      <EuiButton onClick={handleSetCompleted} isLoading={isLoading}>
        Establecer Completados
      </EuiButton>
    </div>
  );
};

export default SetCompleted;