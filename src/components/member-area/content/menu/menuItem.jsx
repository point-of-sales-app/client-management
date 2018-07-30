import React, { Component } from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { updateMenu, deleteMenu } from '../../../../store/menu/menu.actions';
import { bindActionCreators } from 'redux';
import { rupiah } from '../../../../helper/currency'
import IoMore from 'react-icons/lib/io/more';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    editMenu = async () => {
        const { value: formValues } = await swal({
            title: 'Ubah Menu',
            html:
                '<label>Nama:</label>' +
                '<input id="swal-menu-name" class="swal2-input" style="margin-top:0;" value="' + this.props.data.name + '"></input>' +
                '<label>Harga:</label>' +
                '<input id="swal-menu-price" class="swal2-input" style="margin-top:0;" value="' + this.props.data.price + '"></input>',
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: "Batal",
            confirmButtonText: "Ubah",
            preConfirm: () => {
                return [
                    document.getElementById('swal-menu-name').value,
                    document.getElementById('swal-menu-price').value
                ]
            }
        })

        if (formValues) {
            if (formValues[0].trim().length === 0) {
                swal({
                    title: 'Gagal',
                    text: 'Nama menu tidak boleh kosong',
                    type: 'error'
                })
            } else if (isNaN(formValues[1])) {
                swal({
                    title: 'Gagal',
                    text: 'Harga hanya boleh diisi dengan angka',
                    type: 'error'
                })
            } else {
                const name = formValues[0];
                const price = formValues[1].replace(/[^\w\s]/gi, '')
                this.props.updateMenu({
                    id: this.props.data.id,
                    name,
                    categoryId: this.props.menu.selectedCategoryId,
                    price
                });
            }
        }
    }

    deleteMenu = () => {
        swal({
            title: 'Apakah anda yakin?',
            text: 'Menu yang sudah dihapus tidak bisa dikembalikan',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                this.props.deleteMenu({
                    id: this.props.data.id,
                    categoryId: this.props.menu.selectedCategoryId,
                });
            }
        })
    }

    render() {
        return (
            <div className="col-auto pl-0 pb-3">
                <div className="card menu-card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.data.name}</h5>
                    </div>
                    <div className="card-footer bg-dark text-white">
                        <span>{rupiah(this.props.data.price)}</span>
                        <a className='float-right pointer' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <IoMore />
                        </a>
                        <ul className="dropdown-menu">
                            <li className='list-group-item list-group-item-action border-0' onClick={this.editMenu}>Ubah</li>
                            <li className='list-group-item list-group-item-action border-0' onClick={this.deleteMenu}>Hapus</li>
                        </ul>

                        {/* <a className="btn btn-outline-warning btn-sm" onClick={this.editMenu}>Ubah</a>
                        <a className="btn btn-outline-danger btn-sm btn-delete" onClick={this.deleteMenu}>Hapus</a> */}
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
    updateMenu,
    deleteMenu
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);