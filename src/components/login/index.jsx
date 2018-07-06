import React, { Component } from 'react';
import Login from './loginForm';
import Register from './registerForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    componentDidMount () {
        if(localStorage.getItem('token')){
            this.props.history.push('/member-area')
        }
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