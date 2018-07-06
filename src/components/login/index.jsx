import React, { Component } from 'react';
import Login from './loginForm';
import Register from './registerForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (  
            <div>
                <Login/>
                <Register />
            </div>
                
        )
    }
}
 
export default LoginPage;