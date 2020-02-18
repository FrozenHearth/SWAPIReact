import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
