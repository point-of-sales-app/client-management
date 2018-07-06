import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './login.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import Header from './components/header';
// import Sidenav from './components/sidenav';
// import Content from './components/content';
import MemberArea from './components/member-area';
import LoginPage from './components/login';

class App extends Component {

  render() {
    // if(!localStorage.getItem('token')){
    //   return (
    //     <BrowserRouter>
    //       <div className="App">
    //         <Switch>
    //           <Route path="/login" component={LoginPage} />
    //           <Redirect from='/' to='/login' />
    //         </Switch>
    //       </div>
    //     </BrowserRouter>
    //   );
    // }
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
