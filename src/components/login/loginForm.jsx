import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/user/user.actions';
import { bindActionCreators } from 'redux';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.enterBtnHandler();
    }

    login = () => {
        const email = document.querySelector('#emailLogin').value;
        const password = document.querySelector('#passwordLogin').value;
        this.props.login({
            email,
            password
        });
    }

    loginDemo = () => {
        this.props.login({
            email: 'test@pos.com',
            password: '123'
        });
    }

    enterBtnHandler = () => {
        var passwordInput = document.querySelector("#passwordLogin");
            passwordInput.addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.querySelector("button#loginBtn").click();
                }
            });
    }

    render() {
        return (
            <div className="centered-container" id="login-modal" role="dialog">
                <div className="login-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <span className="glyphicon glyphicon-log-in"></span> Silakan masuk ke dalam akunmu</h4>
                    </div>
                    <div className="modal-body-login">
                        <div className="form-group">
                            <label htmlFor="emailLogin">Email</label>
                            <input type="text" className="form-control" id="emailLogin" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordLogin">Password</label>
                            <input type="password" className="form-control" id="passwordLogin"/>
                        </div>
                    </div>
                    <div className="modal-footer-login text-centered">

                        <button id="loginBtn" className="login-btn" onClick={this.login}>Masuk</button>
                        <p>
                            Belum punya akun?
                            <a id="register-anchor" data-toggle="modal" data-target="#register-modal"> Daftar di sini</a>
                        </p>
                        <span>
                            atau
                            <a id="register-anchor" data-toggle="modal" onClick={this.loginDemo}> masuk versi demo</a>
                        </span>
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