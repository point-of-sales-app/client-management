import React, { Component } from 'react';
import Title from '../title';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Title title={'Restaurant'}/>
                <h1> Restaurant </h1>
            </div>
         )
    }
}
 
export default Staff;