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
        return (
            <div className='col-auto padding-0' onClick={this.setCategory}>
                {
                    this.props.menu.selectedCategoryId === 0 ?
                        <div className='category-item category-item-selected'>
                            <p>Semua</p>
                        </div> :
                        <div className='category-item'>
                            <p>Semua</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemAll);