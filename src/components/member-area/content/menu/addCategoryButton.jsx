import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addCategory = async () => {
        const { value: name } = await swal({
            title: 'Tambah Kategori',
            input: 'text',
            inputPlaceholder: 'Nama kategori',
            showCancelButton: true,
            inputValidator: (value) => {
                return !value && 'You need to write something!'
            }
        })

        if (name) {
            this.props.createCategory({
                name
            })
        }
    }

    render() {
        return (
            <button type="button" className='btn btn-outline-secondary btn-filter active' onClick={this.addCategory}>
                Tambah category
            </button>
        );
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    createCategory
}, dispatch)

export default connect(null, mapDispatchToProps)(AddCategory);