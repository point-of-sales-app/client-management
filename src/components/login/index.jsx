import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './loginForm';
import Register from './registerForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className='limiter'>
            <Login />
                {/* <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Redirect from='/login' to='/' />
                </Switch> */}
            </div>
        )
    }
}
 
export default LoginPage;