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
        return (
            <div className='col-auto padding-0' onClick={this.setCategory}>
                {
                    this.props.menu.selectedCategoryId === this.props.data.id ?
                        <div className='category-item category-item-selected'>
                            <p>{this.props.data.name}</p>
                        </div> :
                        <div className='category-item'>
                            <p>{this.props.data.name}</p>
                        </div>
                }
            </div>
        );
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