import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/user/user.actions';
import { bindActionCreators } from 'redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    register = () => {
        const name = document.querySelector('#nameRegister').value;
        const email = document.querySelector('#emailRegister').value;
        const password = document.querySelector('#passwordRegister').value;
        this.props.register({
            name,
            email,
            password
        });
    }

    render() {
        return (
            <div className="modal fade" id="register-modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <span className="glyphicon glyphicon-log-in"></span> Buat akun baru</h4>
                        </div>
                        <div className="modal-body-login">
                            <div className="form-group">
                                <label htmlFor="name">Nama</label>
                                <input type="text" className="form-control" id="nameRegister" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailRegister">Email</label>
                                <input type="email" className="form-control" id="emailRegister" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordRegister">Password</label>
                                <input type="password" className="form-control" id="passwordRegister" />
                            </div>
                        </div>
                        <div className="modal-footer-login text-centered">
                            <button className="login-btn" onClick={this.register}>Daftar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register
}, dispatch)

export default connect(null, mapDispatchToProps)(Register)