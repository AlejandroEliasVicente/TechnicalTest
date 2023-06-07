import React from 'react';
import { EuiButtonIcon } from '@elastic/eui';

interface CompleteTodoProps {
  todoId: string;
  onComplete: (todoId: string) => void;
}

const CompleteTodo: React.FC<CompleteTodoProps> = ({ todoId, onComplete }) => {
  const handleComplete = async () => {
    try {
      const response = await fetch(`/api/custom_plugin/todo/${todoId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'osd-xsrf': 'true',
        },
      });

      if (response.ok) {
        onComplete(todoId);
      } else {
        console.error('Error marking todo as completed:', response.status);
      }
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };

  return (
    <EuiButtonIcon
      iconType="check"
      size="s"
      aria-label="Mark as Completed"
      onClick={handleComplete}
    />
  );
};

export default CompleteTodo;
