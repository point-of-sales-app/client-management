import React, { Component } from 'react';
import Title from '../title';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Title title={'Menu'}/>
                <h1> Menu </h1>
            </div>
         )
    }
}
 
export default Menu;