import React, { Component } from 'react';
import Title from '../title';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Title title={'Beranda'}/>
                <h1> Dashboard </h1>
            </div>
         )
    }
}
 
export default Dashboard;