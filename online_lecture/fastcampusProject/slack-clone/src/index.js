import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './store';
import { composeWithDevTools } from 'redux-devtools-extension';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer, composeWithDevTools())}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
