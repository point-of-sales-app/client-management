import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePathname } from '../../store/state/state.actions';
import { bindActionCreators } from 'redux';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const navItem = document.querySelectorAll('.link');
        const a = document.querySelectorAll('.navitem');
        for (var i = 0; i < navItem.length; i++) {
            if(a[i].innerHTML === this.props.state.pathname){
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
                            <Link className='navitem' to="/">Dashboard</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' to="/sales">Sales</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' to="/expenses">Expenses</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' to="/menu">Menu</Link>
                        </li>
                        <li className="link">
                            <Link className='navitem' to="/staff">Staff</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);