import React, { Component } from 'react';
import Header from '../header';
import Sidenav from '../sidenav';
import Content from '../content';

class MemberArea extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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