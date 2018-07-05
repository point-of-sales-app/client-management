import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePathname } from '../../store/state/state.actions';
import { bindActionCreators } from 'redux';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentWillMount() {
        this.props.updatePathname(this.props.title)
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
 
const mapStateToProps = state => {
    return {
        state: state.state
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updatePathname
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Title)