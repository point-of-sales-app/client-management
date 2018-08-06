import React, { Component } from 'react';
import './header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

    openNav = () => {
        if (document.getElementById('mySidenav').style.width === '250px') {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("page-wrapper").style.marginLeft = "0";
        } else {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("page-wrapper").style.marginLeft = "250px";
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default fixed-top navbar-expand-lg">
                <span id='toogle-nav' className="toogle-nav text-white" onClick={this.openNav}>&#9776; <img className="navbar-brand p-0 pointer ml-2" src="https://storage.googleapis.com/rezapramudhika.com/logo-white.png" alt="logo" height={50} width={120} /></span>

            </nav>
        )
    }
}

export default Header;