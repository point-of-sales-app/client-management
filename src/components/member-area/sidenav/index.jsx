import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePathname } from '../../../store/state/state.actions';
import { bindActionCreators } from 'redux';
import { getRestaurantById } from '../../../store/restaurant/restaurant.actions';
import './sidenav.css';
import swal from 'sweetalert2';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '/member-area'
        }
    }

    componentDidMount() {
        if (localStorage.getItem('resid')) {
            this.props.getRestaurantById();
        }
        const navItem = document.querySelectorAll('.link');
        const a = document.querySelectorAll('.navitem');
        for (var i = 0; i < navItem.length; i++) {
            if (a[i].id === this.props.location.pathname.split('/')[2]) {
                navItem[i].className += ' active'
            } else {
                navItem[i].className = 'link'
            }
        }
    }

    logout = () => {
        swal({
            title: 'Logout',
            text: 'Apakah anda yakin?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                localStorage.clear();
                this.props.history.push('/login')
            }
        })
    }

    changeRestaurant = () => {
        swal({
            text: 'Anda ingin keluar dari '+ this.props.restaurant.restaurant.name+ '?',
            type: 'info',
            showCancelButton: true,
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                this.props.history.push('/restaurant')
            }
        })
    }

    render() {
        const navItem = document.querySelectorAll('.link');
        const a = document.querySelectorAll('.navitem');
        for (var i = 0; i < navItem.length; i++) {
            if (a[i].id === this.props.location.pathname.split('/')[2]) {
                navItem[i].className += ' active'
            } else {
                navItem[i].className = 'link'
            }
        }
        return (
            <div id="mySidenav" className="sidenav sidebar">
                <ul className="nav in">
                    <li className="link active">
                        <Link className='navitem' id='dashboard' to={this.state.path + "/dashboard"}>Beranda</Link>
                    </li>
                    <li className="link">
                        <Link className='navitem' id='sales' to={this.state.path + "/sales"}>Penjualan</Link>
                    </li>
                    <li className="link">
                        <Link className='navitem' id='expenses' to={this.state.path + "/expenses"}>Belanja</Link>
                    </li>
                    <li className="link">
                        <Link className='navitem' id='menu' to={this.state.path + "/menu"}>Menu</Link>
                    </li>
                    <li className="link">
                        <Link className='navitem' id='staff' to={this.state.path + "/staff"}>Staff</Link>
                    </li>
                </ul>
                <ul className="bottom-nav mt-5">
                    <li className='text-white pointer' onClick={this.changeRestaurant}>
                        {
                            this.props.restaurant.getRestaurantByIdLoading ?
                                <p>Memuat...</p> :
                                <p>{this.props.restaurant.restaurant.name}</p>
                        }
                    </li>
                    <li className='pointer' onClick={this.logout}>
                        <a className='logout text-white' id='logout'>Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state.state,
        restaurant: state.restaurant
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updatePathname,
    getRestaurantById
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidenav));