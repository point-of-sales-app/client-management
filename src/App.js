import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './main.css';
import './util.css';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header';
import Sidenav from './components/sidenav';
import Content from './components/content';
import LoginPage from './components/login';

class App extends Component {
  
  render() {
    if(!localStorage.getItem('token')) {
      return (
        <BrowserRouter>
          <div className="App">
            <LoginPage />
          </div>
        </BrowserRouter>
      );
    }
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

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, null)(App)
