import React, { Component } from 'react';

//import classes from './App.css';
import Aux from "./hoc/Auxiliary";
import Header from "./components/Header/Header";
import Title from "./components/Title/Title";

class App extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <Title />
      </Aux>
    );
  }
}

export default App;
