import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePathname } from '../../../store/state/state.actions';
import { bindActionCreators } from 'redux';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '/member-area'
        }
    }

    componentDidMount() {
        const navItem = document.querySelectorAll('.link');
        const a = document.querySelectorAll('.navitem');
        for (var i = 0; i < navItem.length; i++) {
            if(a[i].id === this.props.location.pathname.split('/')[2]){
                navItem[i].className += ' active'
            } else {
                navItem[i].className = 'link'
            }
        }
    }

    render() {
        const navItem = document.querySelectorAll('.link');
        const a = document.querySelectorAll('.navitem');
        for (var i = 0; i < navItem.length; i++) {
            if(a[i].id === this.props.location.pathname.split('/')[2]){
                navItem[i].className += ' active'
            } else {
                navItem[i].className = 'link'
            }
        }
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav in">
                        <li className="link active">
                            <Link className='navitem' id='dashboard' to={this.state.path+"/dashboard"}>Beranda</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' id='sales' to={this.state.path+"/sales"}>Penjualan</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' id='expenses' to={this.state.path+"/expenses"}>Belanja</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' id='menu' to={this.state.path+"/menu"}>Menu</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' id='staff' to={this.state.path+"/staff"}>Staff</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state.state
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updatePathname
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidenav));