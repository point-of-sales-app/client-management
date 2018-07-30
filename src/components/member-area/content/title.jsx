import React, { Component } from 'react';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <div className='row' >
                <div className="col-lg-12">
                    <h1 className="page-header">{this.props.title}</h1>
                </div>
            </div>
         )
    }
}
 
export default Title;