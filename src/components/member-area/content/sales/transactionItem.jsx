import React, { Component } from 'react';
import moment from 'moment';
import { rupiah } from '../../../../helper/currency';

class TransactionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <tr>
                {

                    this.props.filter === '0' ?
                        <td>{moment(this.props.data.createdAt).format("HH:mm:ss")}</td> :
                        <td>{moment(this.props.data.createdAt).format("DD-MM-YYYY")}</td>
                }
                <td>{this.props.data.TransactionMenus.map(function (a) { return `${a.Menu.name} (${a.qty})` }).join(', ')}</td>
                <td>{rupiah(this.props.data.total)}</td>
            </tr>
        );
    }
}

export default TransactionItem;