import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateItem, deleteItem } from '../../../../store/expenses/expenses.actions';
import { bindActionCreators } from 'redux';
import Loading from '../../loading';
import swal from 'sweetalert2';

class GoodsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    editItem = async () => {
        const editSwal = await swal({
            title: 'Ubah Barang',
            html:
                '<label>Nama:</label>' +
                '<input id="swal-item-name" class="swal2-input" style="margin-top:0;"></input>' +
                '<label>Brand:</label>' +
                '<input id="swal-item-brand" class="swal2-input" style="margin-top:0;"></input>' +
                '<label>Satuan:</label>' +
                '<select class="form-control" id="units">' +
                '<option value="1">Kg</option>' +
                '<option value="2">Gram</option>' +
                '<option value="3">Liter</option>' +
                '<option value="4">Ml</option>' +
                '<option value="5">Pc(s)</option>' +
                '</select>',
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hapus',
            confirmButtonText: "Ubah",
            onOpen: () => {
                document.getElementById('units').value = this.props.data.Unit.id;
                document.getElementById('swal-item-brand').value = this.props.data.brand || '-';
                document.getElementById('swal-item-name').value = this.props.data.name;
            },
            preConfirm: () => {
                return [
                    document.getElementById('swal-item-name').value,
                    document.getElementById('swal-item-brand').value,
                    document.getElementById('units').value
                ]
            }
        })

        if (editSwal.dismiss === swal.DismissReason.cancel) {
            this.deleteItem();
        }

        if (editSwal.value) {
            if (editSwal.value[0].trim().length === 0) {
                swal({
                    title: 'Gagal',
                    text: 'Nama menu tidak boleh kosong',
                    type: 'error'
                })
            } else {
                const name = editSwal.value[0];
                const brand = editSwal.value[1];
                const unitid = editSwal.value[2];
                this.props.updateItem({
                    id: this.props.data.id,
                    name,
                    brand,
                    unitid
                })
            }
        }
    }

    deleteItem = () => {
        swal({
            title: `Hapus ${this.props.data.name} ${this.props.data.brand && this.props.data.brand}`,
            text: 'Barang yang sudah dihapus tidak bisa dikembalikan',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                this.props.deleteItem({ id: this.props.data.id })
            }
        })
    }

    render() {
        if (this.props.loading) {
            return (
                <li className="list-group-item list-group-item-action">
                    <Loading />
                </li>
            );
        } else if (this.props.data) {
            return (
                <li className="list-group-item list-group-item-action" onClick={this.editItem}>
                    <p className="font-weight-bold">{this.props.data.name}</p>
                    <p>Brand: {this.props.data.brand ? this.props.data.brand : '-'}</p>
                    <p>Satuan: {this.props.data.Unit.name}</p>
                </li>
            );
        } else {
            return (
                <li className="list-group-item list-group-item-action">
                    <p>Anda belum memiliki barang</p>
                </li>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.expenses
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateItem,
    deleteItem
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GoodsItem);