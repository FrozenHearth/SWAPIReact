import React, { Component } from 'react';
import './App.css';
import Persons from './components/persons/Persons';

export default class App extends Component {
  componentDidMount() {
    this.props.history.push('/persons');
  }
  render() {
    return (
      <div className="App">
        <Persons />
      </div>
    );
  }
}
