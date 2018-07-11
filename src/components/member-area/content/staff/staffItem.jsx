import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStaff } from '../../../../store/staff/staff.actions';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';

class StaffItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    deleteStaff = () => {
        swal({
            title: 'Apakah anda yakin?',
            text: 'Staff yang sudah dihapus tidak akan bisa login kembali',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Batal", 
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.value) {
                this.props.deleteStaff({
                    id: this.props.data.User.id
                });
            }
        })
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index+1}</th>
                <td>{this.props.data.User.name}</td>
                <td>{this.props.data.User.email}</td>
                <td>{this.props.data.Role.name}</td>
                <td>
                    <button className='btn btn-sm btn-outline-danger' onClick={this.deleteStaff}>Hapus</button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteStaff
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StaffItem);