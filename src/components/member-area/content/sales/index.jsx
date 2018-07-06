import React, { Component } from 'react';
import Title from '../title';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Title title={'Sales'}/>
                <h1> Sales </h1>
            </div>
         )
    }
}
 
export default Sales;