import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Sidenav from './components/sidenav';
import Content from './components/content';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Sidenav />
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
