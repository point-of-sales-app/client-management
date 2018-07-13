import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem, getUnit, createItem } from '../../../../store/expenses/expenses.actions';
import { bindActionCreators } from 'redux';
import Title from '../title';
import GoodsItem from './goodsItem';
import swal from 'sweetalert2';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getItem();
        this.props.getUnit();
    }

    addItem = () => {
        swal.mixin({
            confirmButtonText: 'Selanjutnya &rarr;',
            cancelButtonText: 'Batal',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Nama Barang',
                input: 'text',
                inputValidator: (result) => {
                    return !result.trim() && 'Nama barang tidak boleh kosong'
                }
            }, {
                title: 'Brand / Merek',
                input: 'text',
                inputPlaceholder: 'Kosongi jika tidak ada'
            }, {
                title: 'Pilih Satuan',
                input: 'select',
                inputOptions: this.units(),
                inputPlaceholder: 'Pilih',
                inputValidator: (result) => {
                    return !result && 'Pilih satu satuan'
                }
            }
        ]).then((result) => {
            if (result.value) {
                const name = result.value[0];
                const brand = result.value[1];
                const unitid = result.value[2];
                this.props.createItem({
                    name,
                    brand,
                    unitid
                });
            }
        })
    }

    units = () => {
        let obj = {};
        this.props.expenses.units.forEach(element => {
            obj[element.id] = element.name;
        });
        return obj;
    }

    render() {
        return (
            <div>
                <Title title={'Expenses'} />
                <div className='row list-expense-container'>
                    <div className='col-md-4'>
                        <ul className="list-group">
                            <li className="list-group-item active d-flex w-100 justify-content-between">
                                <h6 className='margin-t-5 font-weight-bold text-center'>Daftar Barang</h6>
                                <button className='btn btn-sm btn-outline-light' onClick={this.addItem}>Tambah barang</button>
                            </li>
                            {
                                this.props.expenses.getItemLoading ?
                                    <GoodsItem loading={true} /> :
                                    this.props.expenses.items.length !== 0 ?
                                        this.props.expenses.items.map(item =>
                                            <GoodsItem data={item} key={`item - ${item.id}`} loading={false} />
                                        ) :
                                        <GoodsItem data={null} loading={false} />
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.expenses
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getItem,
    getUnit,
    createItem
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);