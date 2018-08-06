import React, { Component } from 'react';
import Title from '../title';
import { connect } from 'react-redux';
import { getSummary } from '../../../../store/sales/sales.actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { rupiah } from '../../../../helper/currency';
import TransactionItem from './transactionItem';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '0'
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
        if (!localStorage.getItem('resid')) {
            this.props.history.push('/restaurant')
        }
        const btn = document.querySelectorAll('.btn-filter');
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].id === this.state.filter) {
                btn[i].className += ' active'
            } else {
                btn[i].className = 'btn btn-outline-secondary btn-filter'
            }
        }
        this.props.getSummary({
            dateFrom: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            dateTo: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
        })
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
                btn[i].className = 'btn btn-outline-primary btn-filter'
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
                dateFrom = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
                dateTo = moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
                break;
            case '2':
                dateFrom = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
                dateTo = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
                break;
            default:
                dateFrom = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
                dateTo = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        }

        this.props.getSummary({
            dateFrom,
            dateTo
        })
    }

    render() {
        const { totalSales, topSales } = this.props.sales.summary;
        const data = this.props.sales.data;
        return (
            <div>
                <Title title={'Penjualan'} />
                <div className='row mb-3'>
                    <div className='col align-self-start'>
                        <div className="btn-group">
                            <button type="button" id='0' className="btn btn-outline-primary btn-filter" onClick={() => this.filter('0')}>Hari ini</button>
                            <button type="button" id='1' className="btn btn-outline-primary btn-filter" onClick={() => this.filter('1')}>Minggu ini</button>
                            <button type="button" id='2' className="btn btn-outline-primary btn-filter" onClick={() => this.filter('2')}>Bulan ini</button>
                        </div>
                    </div>
                </div>
                <div className='row card-deck'>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Total Penjualan
                            </div>
                        <div className="card-body">
                            {
                                this.props.sales.getSummaryLoading ?
                                    <h4 className="card-text">Memuat...</h4> :
                                    totalSales === 0 ?
                                        <h4 className="card-text">0</h4> :
                                        <h4 className="card-text">{rupiah(totalSales)}</h4>
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Jumlah Transaksi
                            </div>
                        <div className="card-body">
                            {
                                this.props.sales.getSummaryLoading ?
                                    <h4 className="card-text">Memuat...</h4> :
                                    <h4 className="card-text">{data.length}</h4>
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Menu Terlaris
                            </div>
                        <div className="card-body">
                            {
                                this.props.sales.getSummaryLoading ?
                                    <h4 className="card-text">Memuat...</h4> :
                                    topSales.length === 0 ?
                                        <p className='font-weight-bold'>-</p> :
                                        topSales.map((element, i) =>
                                            <div key={`topsales ${i}`}>
                                                <p>{element.category}</p>
                                                {
                                                    i === 0 ?
                                                        <p className='mb-2 font-weight-bold'>{element.name} ({element.count}x)</p> :
                                                        <p className='font-weight-bold'>{element.name} ({element.count}x)</p>
                                                }
                                            </div>
                                        )
                            }
                        </div>
                    </div>
                </div>
                <div className='row mt-3 pl-3 pr-3'>
                    <table className='table table-striped table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                {
                                    this.state.filter === '0' ?
                                        <th scope='col'>Pukul</th> :
                                        <th scope='col'>Tanggal</th>
                                }
                                <th scope='col'>Menu</th>
                                <th scope='col'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.sales.getSummaryLoading ?
                                    <tr>
                                        <td colSpan='6'>Memuat...</td>
                                    </tr> :
                                    data.length !== 0 ?
                                        data.map((item, idx) =>
                                            <TransactionItem
                                                data={item}
                                                filter={this.state.filter}
                                                key={`transaction ${item.id}`} />
                                        ) :
                                        <tr>
                                            <td colSpan='6'>Anda belum memiliki transaksi</td>
                                        </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sales: state.sales
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSummary
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sales);