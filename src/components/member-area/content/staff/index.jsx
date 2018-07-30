import React, { Component } from 'react';
import Title from '../title';
import { connect } from 'react-redux';
import { getStaff, createStaff } from '../../../../store/staff/staff.actions';
import { bindActionCreators } from 'redux';
import StaffItem from './staffItem';
import Loading from '../../loading';
import { isEmail } from '../../../../helper/isEmail';
import swal from 'sweetalert2';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getStaff();
    }

    addStaff = async () => {
        const { value: formValues } = await swal({
            title: 'Tambah Staff',
            html:
                '<label>Nama:</label>' +
                '<input id="swal-staff-name" class="swal2-input" style="margin-top:0;"></input>' +
                '<label>Email:</label>' +
                '<input id="swal-staff-email" class="swal2-input" style="margin-top:0;"></input>' +
                '<label>Password:</label>' +
                '<input type="password" id="swal-staff-password" class="swal2-input" style="margin-top:0;"></input>',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById('swal-staff-name').value,
                    document.getElementById('swal-staff-email').value,
                    document.getElementById('swal-staff-password').value
                ]
            }
        })

        if (formValues) {
            if (formValues[0].trim().length === 0) {
                swal({
                    title: 'Gagal',
                    text: 'Nama tidak boleh kosong',
                    type: 'error'
                })
            } else if (!isEmail(formValues[1])) {
                swal({
                    title: 'Gagal',
                    text: 'Alamat email tidak sesuai',
                    type: 'error'
                })
            } else if (formValues[2].trim().length === 0) {
                swal({
                    title: 'Gagal',
                    text: 'Password tidak boleh kosong',
                    type: 'error'
                })
            } else {
                const name = formValues[0];
                const email = formValues[1];
                const password = formValues[2];
                this.props.createStaff({
                    name,
                    email,
                    password
                });
            }  
        }
    }

    render() {
        console.log(this.props.staff.staff)
        return (
            <div>
                <Title title={'Staff'} />
                <div className='row mb-2'>
                    <div className='col'>
                        <button id='staff-register-btn' className='btn btn-primary' onClick={this.addStaff}>Tambah Staff</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {
                            this.props.staff.getStaffLoading ?
                                <Loading loading={this.props.staff.getStaffLoading} /> :
                                this.props.staff.staff.length === 0 ?
                                    <h5>Anda belum memiliki staff</h5> :
                                    <table className="table table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.staff.staff.map((item, idx) =>
                                                    <StaffItem data={item} index={idx} key={`staff ${item.UserId}`} />
                                                )
                                            }
                                        </tbody>
                                    </table>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getStaff,
    createStaff
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Staff);