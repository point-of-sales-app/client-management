import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { getSummary, getDasboard } from '../../../../store/sales/sales.actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Graph from './graph';
import { rupiah } from '../../../../helper/currency';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            startDate: moment().startOf('year'),
            endDate: moment().endOf('year'),
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            const decoded = jwt.verify(localStorage.getItem('token'), 'ggwp');
            this.setState({
                name: decoded.name
            })
        } else {
            this.props.history.push('/login')
        }
        if (!localStorage.getItem('resid')) {
            this.props.history.push('/restaurant')
        }
        this.props.getSummary({
            dateFrom: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            dateTo: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        })
        this.props.getDasboard({
            dateFrom: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
            dateTo: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss')
        })
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
        this.props.getDasboard({
            dateFrom: moment(this.state.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            dateTo: moment(this.state.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        })
        console.log(moment(this.state.startDate).startOf('day').format('MM-DD-YYYY HH:mm:ss'))
        console.log(moment(this.state.endDate).endOf('day').format('MM-DD-YYYY HH:mm:ss'))
    }


    render() {
        return (
            <div id='dashboard'>
                <div className='row card-deck'>
                    <div className='card' style={style.borderShadow}>
                        <div className='card-body'>
                            <form>
                                <DatePicker
                                    className='pointer text-center'
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeStart}
                                />
                                <DatePicker
                                    className='pointer text-center mt-1'
                                    selected={this.state.endDate}
                                    onChange={this.handleChangeEnd}
                                />
                            </form>
                        </div>
                    </div>
                    <div className='card' style={style.borderShadow}>
                        <div className='card-body'>
                            <h5>Total Transaksi</h5>
                            {
                                this.props.sales.getDashboardLoading ?
                                    <p>Memuat...</p> :
                                    this.props.sales.dashboard.totalTransaction ?
                                        <p>{this.props.sales.dashboard.totalTransaction}</p> :
                                        <p>0</p>
                            }
                        </div>
                    </div>
                    <div className="card" style={style.borderShadow}>
                        <div className="card-body">
                            <h5>Total Profit</h5>
                            {
                                this.props.sales.getDashboardLoading ?
                                    <p>Memuat...</p> :
                                    this.props.sales.dashboard.profit ?
                                        <p>{rupiah(this.props.sales.dashboard.profit.profit)}</p> :
                                        <p>0</p>
                            }
                        </div>
                    </div>
                </div>
                {
                    !this.props.sales.getDashboardLoading && <Graph data={this.props.sales.dashboard.graph} />
                }
            </div>
        )
    }
}

const style = {
    borderShadow: {
        borderWidth: '0px',
        borderRadius: '2px',
        boxShadow: '0.2px 2px 5px #888888'
    }
}

const mapStateToProps = state => {
    return {
        sales: state.sales
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getSummary, getDasboard
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);