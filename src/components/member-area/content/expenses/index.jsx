import React, { Component } from 'react';
import Title from '../title';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Title title={'Expenses'}/>
                <h1> Expenses </h1>
            </div>
         )
    }
}
 
export default Expenses;