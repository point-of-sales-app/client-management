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
                <Title title={'Staff'}/>
                <h1> Staff </h1>
            </div>
         )
    }
}
 
export default Staff;