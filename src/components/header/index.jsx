import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            const decoded = jwt.verify(localStorage.getItem('token'), 'ggwp');
            this.setState({
                name: decoded.name
            })
        }
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login')
        // console.log(this.props)
    }

    render() {
        return (
            <nav className="navbar navbar-default fixed-top navbar-expand-lg">
                <a className="navbar-brand" href="/">Simple POS</a>
                <div className="ml-auto">
                    <span className="navbar-text">
                        Halo, {this.state.name}
                    </span>
                    <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                </div>
            </nav>
        )
    }
}

export default withRouter(Header);