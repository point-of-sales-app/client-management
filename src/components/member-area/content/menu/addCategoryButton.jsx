import React, { Component } from 'react';
import * as MaterialDesign from 'react-icons/lib/md'
import { connect } from 'react-redux';
import { createCategory } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addCategory = async() => {
        const {value: name} = await swal({
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
            <div className='col-auto align-self-center'>
                <MaterialDesign.MdAddCircle size={18} />
                <a className='add-category' onClick={this.addCategory}> Tambah category</a>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    createCategory
}, dispatch)

export default connect(null, mapDispatchToProps)(AddCategory);