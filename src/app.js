import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import 'file?name=favicon.ico!./images/favicon.ico';
import 'file?name=favicon.png!./images/favicon.png';
import './styles/main.scss';
import 'babel-polyfill';

import routes from './routes';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.querySelector('#root'));
