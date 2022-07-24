import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './TodoTemplate2';
import TodoHead from './TodoHead2';
import TodoList from './TodoList2';
import TodoCreate from './TodoCreate2';
import { TodoProvider } from './TodoContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App2() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App2;