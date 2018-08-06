import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <ClipLoader
                color={'#3d4b63'}
                loading={this.props.loading}
            />
        )
    }
}

export default Loading;