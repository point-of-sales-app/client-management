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
        this.state = {}
    }
    render() {
        return (
            <div className="page-wrapper">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/sales" component={Sales} />
                    <Route path="/expenses" component={Expenses} />
                    <Route path="/menu" component={Menu} />
                    <Route path="/staff" component={Staff} />
                    <Redirect from='/' to='/' />
                </Switch>
            </div>
        )
    }
}

export default Content;