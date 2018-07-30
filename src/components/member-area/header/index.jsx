import React, { Component } from 'react';
// import jwt from 'jsonwebtoken';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getRestaurantById } from '../../../store/restaurant/restaurant.actions';
import { bindActionCreators } from 'redux';
import * as MD from 'react-icons/lib/md'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        // if (localStorage.getItem('token')) {
        //     const decoded = jwt.verify(localStorage.getItem('token'), 'ggwp');
        //     this.setState({
        //         name: decoded.name
        //     })
        // }
        if (localStorage.getItem('resid')) {
            this.props.getRestaurantById();
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
                <img className="navbar-brand pointer" src="https://storage.googleapis.com/rezapramudhika.com/logo-white.png" alt="logo" height={50} />
                <div className="ml-auto">
                    {/* <span className="navbar-text">
                        Halo, {this.state.name}
                    </span> */}
                    {
                        this.props.restaurant.getRestaurantByIdLoading ?
                            <span className="navbar-text">
                                loading...
                            </span> :
                            <span className="navbar-text">
                                <MD.MdStore size={22} />
                                {this.props.restaurant.restaurant.name}
                                <Link to='/restaurant'> (change)</Link>
                            </span>
                    }
                    <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = state => {
    return {
        restaurant: state.restaurant
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getRestaurantById
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));