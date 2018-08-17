import React, { Component } from 'react';

import classes from './App.css';
import Aux from "./hoc/Auxiliary";

class App extends Component {
  render() {
    return (
      <Aux>
        <header className={classes.Header}></header>
      </Aux>
    );
  }
}

export default App;
