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

const [timeStamp, setTimestamp]= useState<number>();

  const handleTodoAdded = () => {
    setTimestamp(new Date().getTime());
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
  }, [timeStamp]);


  const handleDeleteTodo = () => {
    setTimestamp(new Date().getTime());
  };

  const handleCompleteTodo = () => {
    setTimestamp(new Date().getTime());
  };
  
  const handleUpdateTodo =  () => {
    setTimestamp(new Date().getTime());
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
                  <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} onUpdateTodo={handleUpdateTodo}/>      
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};