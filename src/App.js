import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import Auth from './auth/Auth';

class App extends Component {
  render() {
    return (
      <div className={classes.App} >
        <Auth></Auth>
      </div>);
  }
}

export default App;
