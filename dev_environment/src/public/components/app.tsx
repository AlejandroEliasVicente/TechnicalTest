import React, { useEffect, useState } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Todo } from '../types';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import TodoList from './ListarTODO';
import NewTodo from './NewTODO';
import DelTODO from './DelTODO';
import { useEffectOnce } from 'react-use';
import CompleteTodo from './IsCompleted';
import EditTodo from './EditTODO';



interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = useState<string | undefined>();
  const [todos, setTodos] = useState<Todo[]>([]);

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/custom_plugin/example').then((res) => {
      setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };

  let [addButtonClicked] = useState(new Date().getTime());

  const handleTodoAdded = (newTodo: Todo) => {
    const updatedTodos = [...todos, newTodo];
          setTodos(updatedTodos);
  };


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/custom_plugin/todo');
        const data = await response.json();
        const todosData = data.todos.map((todo: any) => todo._source); // Extraer los TODOS del objeto de respuesta
  
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    fetchTodos();
  }, [addButtonClicked]);


  const handleDeleteTodo = async (todoId: number) => {
    try {
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`/api/custom_plugin/todo/${todoId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'osd-xsrf': 'true',
        },
      });
  
      if (response.ok) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === parseInt(todoId)) {
            return { 
              ...todo, 
              isCompleted: true 
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        console.error('Error marking todo as completed:', response.status);
      }
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };
  
  

  function updateTODO(todos:Todo[]){
    setTodos(todos)
  }
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    // Actualiza el estado de los todos con el todo actualizado
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    // Finaliza la edición estableciendo editingTodo a null
    setEditingTodo(null);
  };
  
  
  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage>
            <EuiPageBody component="div">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>{PLUGIN_NAME}</h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="customPlugin.welcomeTitle"
                        defaultMessage="Welcome to {name}!"
                        values={{ name: PLUGIN_NAME }}
                      />
                    </h2>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <NewTodo onTodoAdded={handleTodoAdded} />
                  <EuiHorizontalRule />
                  <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} />      
                  {editingTodo && (
                    <EditTodo todo={editingTodo} onUpdateTodo={handleUpdateTodo} />
                  )}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};