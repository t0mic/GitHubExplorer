import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store/store';

const AppStore = new Store();

ReactDOM.render(
  <React.StrictMode>
    <App store={AppStore} />
  </React.StrictMode>,
  document.getElementById('root')
);
