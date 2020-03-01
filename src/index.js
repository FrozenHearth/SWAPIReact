import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import Persons from './components/persons/Persons';
import PersonDetails from './components/persons/person-details/PersonDetails';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/persons" component={Persons} />
        <Route exact path="/persons/:id" component={PersonDetails} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
