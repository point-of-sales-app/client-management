import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategory, getMenu } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';

class CategoryItemAll extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setCategory = async () => {
        await this.props.setCategory(0)
        this.props.getMenu({
            categoryId: this.props.menu.selectedCategoryId
        })
    }

    render() {
        if (this.props.menu.selectedCategoryId === 0) {
            return (
                <button type="button" className='btn btn-outline-primary btn-filter active' onClick={this.setCategory}>
                    Semua
                </button>
            );
        } else {
            return (
                <button type="button" className='btn btn-outline-primary btn-filter' onClick={this.setCategory}>
                    Semua
                </button>
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setCategory,
    getMenu
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemAll);