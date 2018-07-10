import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMenu } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';

class AddMenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addRestaurant = () => {
        swal.mixin({
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Nama Menu Baru',
                input: 'text',
                inputValidator: (result) => {
                    return !result.trim() && 'Nama menu tidak boleh kosong'
                }
            }, {
                title: 'Pilih Kategori',
                input: 'select',
                inputOptions: this.categories(),
                inputPlaceholder: 'Pilih',
                inputValidator: (result) => {
                    return !result && 'Pilih satu kategori'
                }
            }, {
                title: 'Harga',
                input: 'text',
                inputPlaceholder:
                    'Hanya boleh diisi dengan angka',
                inputValidator: (result) => {
                    var number = result.replace(/./, "");
                    return isNaN(number) && 'Harga hanya boleh diisi dengan angka'
                }
            }
        ]).then((result) => {
            if (result.value) {
                const name = result.value[0];
                const categoryId = result.value[1];
                const price = result.value[2].replace(/[^\w\s]/gi, '')
                this.props.createMenu({
                    name,
                    categoryId,
                    price
                });
            }
        })
    }

    categories = () => {
        let obj = {};
        this.props.menu.categories.forEach(element => {
            obj[element.id] = element.name;
        });
        return obj;
    }

    render() {
        return (
            <div className="col-auto menu-item-container" onClick={this.addRestaurant}>
                <div className="card menu-card add-menu-container">
                    <div className="card-body add-menu-body">
                        <h5 className="">Tambah menu</h5>
                    </div>
                </div>
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
    createMenu
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddMenuButton);