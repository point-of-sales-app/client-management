import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../../../../store/expenses/expenses.actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { rupiah } from '../../../../helper/currency';
import DeleteIcon from 'react-icons/lib/md/delete-forever';
import swal from 'sweetalert2';

class ExpensesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    deleteExpenses = () => {
        let dateFrom = '';
        let dateTo = '';
        switch (this.props.filter) {
            case '0':
                dateFrom = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
                dateTo = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
                break;
            case '1':
                dateFrom = moment().startOf('isoweek').format('YYYY-MM-DD');
                dateTo = moment().endOf('isoweek').format('YYYY-MM-DD');
                break;
            case '2':
                dateFrom = moment().startOf('month').format('YYYY-MM-DD');
                dateTo = moment().endOf('month').format('YYYY-MM-DD');
                break;
            default:
                dateFrom = moment().startOf('day').format('YYYY-MM-DD');
                dateTo = moment().endOf('day').format('YYYY-MM-DD');
        }
        swal({
            title: 'Apakah anda yakin?',
            text: 'Daftar belanja yang sudah dihapus tidak bisa dikembalikan',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                this.props.deleteExpenses({
                    id: this.props.data.id,
                    dateFrom,
                    dateTo
                })
            }
        })
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index + 1}</th>
                <td>{moment(this.props.data.createdAt).format("DD-MM-YYYY")}</td>
                <td>{this.props.data.Item.name} {this.props.data.Item.brand && `(${this.props.data.Item.brand})`}</td>
                <td>{rupiah(this.props.data.price)}</td>
                <td>{this.props.data.qty}</td>
                <td>{rupiah(this.props.data.totalPrice)}</td>
                <td className='text-center pointer' onClick={this.deleteExpenses}> <DeleteIcon size={24} color={'#dc3545'} /> </td>
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteExpenses
}, dispatch)

export default connect(null, mapDispatchToProps)(ExpensesItem);