import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // componentDidMount() {
    //     const navItem = document.querySelectorAll('.link');
    //     for (var i = 0; i < navItem.length; i++) {
    //         navItem[i].addEventListener("click", function () {
    //             var current = document.getElementsByClassName("active");
    //             current[0].className = current[0].className.replace(" active", "");
    //             this.className += " active";
    //         });
    //     }
    // }

    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav in">
                        <li className="link active">
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li className="link">
                            <Link to="/sales">Sales</Link>
                        </li>
                        <li className="link">
                            <Link to="/expenses">Expenses</Link>
                        </li>
                        <li className="link">
                            <Link to="/menu">Menu</Link>
                        </li>
                        <li className="link">
                            <Link to="/staff">Staff</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidenav;