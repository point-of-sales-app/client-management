import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            // <div className="centered-container loading-container">
            //     <h3>Getting your data...</h3>
            <ClipLoader
                color={'#3d4b63'}
                loading={this.props.loading}
            />
            // </div>
        )
    }
}

export default Loading;