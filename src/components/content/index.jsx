import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import Sales from './sales';
import Expenses from './expenses';
import Menu from './menu';
import Staff from './staff';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '/member-area'
        }
    }
    render() {
        return (
            <div className="page-wrapper">
                <Switch>
                    <Route path={this.state.path+'/dashboard'} component={Dashboard} />
                    <Route path={this.state.path+'/sales'} component={Sales} />
                    <Route path={this.state.path+'/expenses'} component={Expenses} />
                    <Route path={this.state.path+'/menu'} component={Menu} />
                    <Route path={this.state.path+'/staff'} component={Staff} />
                    <Redirect from={this.state.path} to={this.state.path+'/dasboard'} />
                </Switch>
            </div>
        )
    }
}

export default Content;