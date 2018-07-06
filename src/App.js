import React, { Component } from 'react';
import './App.css';
import './login.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MemberArea from './components/member-area';
import LoginPage from './components/login';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/member-area" component={MemberArea} />
            <Route path="/login" component={LoginPage} />
            <Redirect from='/' to='/login' />
          </Switch>
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
