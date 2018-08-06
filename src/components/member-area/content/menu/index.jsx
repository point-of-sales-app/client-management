import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getMenu } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import Title from '../title';
import CategoryItem from './categoryItem';
import AddCategoryButton from './addCategoryButton';
import CategoryItemAll from './categoryItemAll';
import MenuItem from './menuItem';
import Loading from '../../loading';
import AddMenuButton from './addMenuButton';
import './menu.css'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
        if (!localStorage.getItem('resid')) {
            this.props.history.push('/restaurant')
        }
        this.props.getCategories();
        this.props.getMenu({
            categoryId: this.props.menu.selectedCategoryId
        })
    }

    render() {
        return (
            <div>
                <Title title={'Menu'} />
                    <div className='row'>
                        <div className="col btn-group">
                            {
                                this.props.menu.categories.length !== 0 && <CategoryItemAll />
                            }
                            {
                                this.props.menu.categories.length !== 0
                                && this.props.menu.categories.map(item =>
                                    <CategoryItem data={item} key={'category ' + item.id} />
                                )
                            }
                            <AddCategoryButton />
                        </div>
                    </div>
                    <div className='row col mt-3'>
                        {
                            this.props.menu.getMenuLoading ?
                                <Loading loading={this.props.menu.getMenuLoading} /> :
                                this.props.menu.menu.map(item =>
                                    <MenuItem data={item} key={'menu ' + item.id} />
                                )
                        }
                        {
                            this.props.menu.categories.length !== 0 &&
                            !this.props.menu.getMenuLoading &&
                            <AddMenuButton />
                        }
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCategories,
    getMenu
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu);