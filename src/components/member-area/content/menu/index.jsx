import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import Title from '../title';
import CategoryItem from './categoryItem';
import AddCategoryButton from './addCategoryButton';
import CategoryItemAll from './categoryItemAll';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <div>
                <Title title={'Menu'} />
                <div className='container'>
                    <div className='row'>
                        {
                            this.props.menu.categories.length !== 0 && <CategoryItemAll />
                        }
                        {
                            this.props.menu.categories.length !== 0
                            && this.props.menu.categories.map(item =>
                                <CategoryItem data={item} key={'category' + item.id}/>
                            )
                        }
                        <AddCategoryButton />
                    </div>
                    {/* <div className='row'>
                        TEst2
                    </div> */}
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
    getCategories
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu);