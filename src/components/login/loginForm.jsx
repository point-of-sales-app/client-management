import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/user/user.actions';
import { bindActionCreators } from 'redux';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    login = () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        this.props.login(email, password);
    }

    render() { 
        return (  
            <div className='container-login100'>
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form className="login100-form validate-form flex-sb flex-w">
                        <span className="login100-form-title p-b-51">Login</span>
                        <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                            <input id='email' className="input100" type="text" name="username" placeholder="Username"/>
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                            <input id='password' className="input100" type="password" name="pass" placeholder="Password"/>
                            <span className="focus-input100"></span>
                        </div>
                        <div className="flex-sb-m w-full p-t-3 p-b-24">
                            <div className="contact100-form-checkbox">
                                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                <label className="label-checkbox100" for="ckb1">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a href="#" className="txt1">
                                    Forgot?
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="container-login100-form-btn m-t-17">
                            <button className="login100-form-btn" onClick={this.login}>
                                Hello
                            </button>
                        </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login
}, dispatch)

export default connect(null, mapDispatchToProps)(LoginForm)