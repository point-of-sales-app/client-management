import React, { Component } from 'react';
import Header from '../header';
import Sidenav from '../sidenav';
import Content from './content';

class MemberArea extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Sidenav />
                <Content />
            </div>
        )
    }
}

export default MemberArea;