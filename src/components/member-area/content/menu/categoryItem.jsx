import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategory, getMenu } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setCategory = async () => {
        await this.props.setCategory(this.props.data.id)
        this.props.getMenu({
            categoryId: this.props.menu.selectedCategoryId
        })
    }

    render() {
        if (this.props.menu.selectedCategoryId === this.props.data.id) {
            return (
                <button type="button" className='btn btn-outline-primary btn-filter active' onClick={this.setCategory}>
                    {this.props.data.name}
                </button>
            )
        } else {
            return (
                <button type="button" className='btn btn-outline-primary btn-filter' onClick={this.setCategory}>
                    {this.props.data.name}
                </button>
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);