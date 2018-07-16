import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem, getUnit, createItem, getExpenses, createExpenses } from '../../../../store/expenses/expenses.actions';
import { bindActionCreators } from 'redux';
import Title from '../title';
import GoodsItem from './goodsItem';
import swal from 'sweetalert2';
import moment from 'moment';
import ExpensesItem from './expensesItem';
import { rupiah } from '../../../../helper/currency';
import ShopIcon from 'react-icons/lib/md/shopping-basket';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '0'
        }
    }

    componentDidMount() {
        this.props.getItem();
        this.props.getUnit();
        const btn = document.querySelectorAll('.btn-filter');
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].id === this.state.filter) {
                btn[i].className += ' active'
            } else {
                btn[i].className = 'btn btn-outline-secondary btn-filter'
            }
        }
        this.props.getExpenses({
            dateFrom: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            dateTo: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
        })
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

    filter = async (id) => {
        await this.setState({
            filter: id
        })
        const btn = document.querySelectorAll('.btn-filter');
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].id === this.state.filter) {
                btn[i].className += ' active'
            } else {
                btn[i].className = 'btn btn-outline-secondary btn-filter'
            }
        }
        let dateFrom = '';
        let dateTo = '';
        switch (id) {
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

        this.props.getExpenses({
            dateFrom,
            dateTo
        })
    }

    addExpenses = () => {
        swal.mixin({
            confirmButtonText: 'Selanjutnya &rarr;',
            cancelButtonText: 'Batal',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Pilih Barang',
                input: 'select',
                inputOptions: this.items(),
                inputPlaceholder: 'Pilih',
                inputValidator: (result) => {
                    return !result && 'Pilih satu barang'
                }
            }, {
                title: 'Jumlah',
                input: 'text',
                inputPlaceholder: 'Isi dengan angka',
                inputValidator: (result) => {
                    if (!result) {
                        return 'Harus diisi'
                    }
                    return isNaN(result) && 'Jumlah hanya boleh diisi dengan angka'
                }
            }, {
                title: 'Harga per barang',
                input: 'text',
                inputPlaceholder: 'Isi dengan angka',
                confirmButtonText: 'Tambahkan ke daftar belanja',
                inputValidator: (result) => {
                    if (!result) {
                        return 'Harus diisi'
                    }
                    return isNaN(result) && 'Harga hanya boleh diisi dengan angka'
                }
            }
        ]).then((result) => {
            if (result.value) {
                const ItemId = result.value[0];
                const qty = result.value[1];
                const price = result.value[2];
                this.props.createExpenses({
                    ItemId,
                    qty,
                    price
                });
            }
        })
    }

    items = () => {
        let obj = {};
        this.props.expenses.items.forEach(element => {
            obj[element.id] = `${element.name} ${element.brand && '(' + element.brand + ')'}`;
        });
        return obj;
    }

    render() {
        return (
            <div>
                <Title title={'Belanja'} />
                <div className='row list-expense-container'>
                    <div className='col-3'>
                        <ul className="list-group">
                            <li className="list-group-item active d-flex w-100 justify-content-between">
                                <h6 className='margin-t-5 font-weight-bold text-center'>Daftar Barang</h6>
                                <button className='btn btn-sm btn-outline-light' onClick={this.addItem}>Tambah</button>
                            </li>
                            <div className='scrollable'>
                                {
                                    this.props.expenses.getItemLoading ?
                                        <GoodsItem loading={true} /> :
                                        this.props.expenses.items.length !== 0 ?
                                            this.props.expenses.items.map(item =>
                                                <GoodsItem data={item} key={`item - ${item.id}`} loading={false} />
                                            ) :
                                            <GoodsItem data={null} loading={false} />
                                }
                            </div>
                        </ul>
                    </div>
                    <div className='col-9'>
                        <div className='row mb-2'>
                            <div className='col align-self-start p-0'>
                                <div className="btn-group">
                                    <button type="button" id='0' className="btn btn-outline-secondary btn-filter" onClick={() => this.filter('0')}>Hari ini</button>
                                    <button type="button" id='1' className="btn btn-outline-secondary btn-filter" onClick={() => this.filter('1')}>Minggu ini</button>
                                    <button type="button" id='2' className="btn btn-outline-secondary btn-filter" onClick={() => this.filter('2')}>Bulan ini</button>
                                </div>
                            </div>
                            <div className='col align-self-end p-0'>
                                <button className='btn btn-primary float-right' onClick={this.addExpenses}><ShopIcon /> Belanja </button>
                            </div>
                        </div>
                        <div className='row'>
                            <table className='table table-striped table-bordered'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Tanggal</th>
                                        <th scope='col'>Barang</th>
                                        <th scope='col'>Harga</th>
                                        <th scope='col'>Kuantitas</th>
                                        <th scope='col' colSpan='2'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.expenses.getExpensesLoading ?
                                            <tr>
                                                <td colSpan='6'>Memuat...</td>
                                            </tr> :
                                            this.props.expenses.expenses.length !== 0 ?
                                                this.props.expenses.expenses.map((item, idx) =>
                                                    <ExpensesItem data={item} index={idx} key={`expenses ${item.id}`} filter={this.state.filter} />
                                                ) :
                                                <tr>
                                                    <td colSpan='6'>Anda belum memiliki daftar belanja</td>
                                                </tr>
                                    }
                                    <tr>
                                        <td colSpan='5'>Total Pengeluaran</td>
                                        <td colSpan='2'>{rupiah(this.props.expenses.sum)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    createItem,
    getExpenses,
    createExpenses
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);