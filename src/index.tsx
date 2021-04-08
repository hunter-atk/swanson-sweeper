import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, AppProviders } from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
