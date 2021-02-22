import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NavBar from './components/NavBar';
import App from './containers/App';
import AppProviders from './context';

ReactDOM.render(
  <>
    <AppProviders>
      <NavBar />
      <App />
    </AppProviders>
  </>,
  document.getElementById('root'),
);
