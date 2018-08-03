import React, { Component } from 'react';
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
        if (localStorage.getItem('resid')) {
            this.props.getRestaurantById();
        }
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

    render() {
        return (
            <nav className="navbar navbar-default fixed-top navbar-expand-lg">
                <img className="navbar-brand p-0 pointer" src="https://storage.googleapis.com/rezapramudhika.com/logo-white.png" alt="logo" height={50} width={120} />
                <div className="ml-auto">
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