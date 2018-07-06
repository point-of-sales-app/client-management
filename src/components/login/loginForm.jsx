import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/user/user.actions';
import { bindActionCreators } from 'redux';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    login = () => {
        const email = document.querySelector('#emailLogin').value;
        const password = document.querySelector('#passwordLogin').value;
        this.props.login({
            email, 
            password
        });
    }

    render() {
        return (
            <div className="container" id="login-modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
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
                                <input type="password" className="form-control" id="passwordLogin" />
                            </div>
                        </div>
                        <div className="modal-footer-login text-centered">

                            <button className="login-btn" onClick={this.login}>Masuk</button>
                            <p>
                                Belum punya akun?
                            <a className="register-anchor" href="#" data-toggle="modal" data-target="#register-modal"> Daftar di sini</a>
                            </p>
                        </div>
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