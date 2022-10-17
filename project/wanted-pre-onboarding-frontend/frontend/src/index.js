import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyle';
import { TodoProvider } from './TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoProvider>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </TodoProvider>
);
