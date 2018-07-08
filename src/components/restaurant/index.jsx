import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { getRestaurant, createRestaurant } from '../../store/restaurant/restaurant.actions';
import { bindActionCreators } from 'redux';
import { PulseLoader } from 'react-spinners';
import RestaurantItem from './restaurantItem';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
        localStorage.removeItem('resid');
        this.props.getRestaurant();
    }

    addNewRestaurant = () => {
        swal.mixin({
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4']
        }).queue([
            {
                title: 'Nama Restaurant',
                input: 'text'
            }, {
                title: 'Alamat Restaurant',
                input: 'text'
            }, {
                title: 'Email Restaurant',
                input: 'text',
                inputPlaceholder:
                    'Kosongi jika tidak ada',
                inputValidator: (result) => {
                    return !this.validateEmail(result) && 'Masukkan alamat email yang benar'
                }
            }, {
                title: 'Pajak Restaurant',
                input: 'checkbox',
                inputPlaceholder:
                    'Menggunakan 10% pajak restaurant?',
                confirmButtonText:
                    'Continue <i class="fa fa-arrow-right></i>'
            }
        ]).then( (result) => {
            if (result.value) {
                const restaurantData = {
                    name: result.value[0],
                    address: result.value[1],
                    email: result.value[2],
                    tax: result.value[3]
                }
                this.props.createRestaurant(restaurantData);
            }
        })
    }

    validateEmail(email) {
        if(!email) {
            return true
        }
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        console.log(this.props.restaurant.restaurants)
        return (
            <div className="centered-container">
                <div className="restaurant-content">
                    <h3>Choose a restaurant</h3>
                    <div className='loading-spinner'>
                        <PulseLoader
                            color={'#123abc'}
                            loading={this.props.restaurant.getRestaurantLoading}
                        />
                    </div>
                    <ul className="list-unstyled">
                        {
                            this.props.restaurant.restaurants.map(item =>
                                <RestaurantItem data={item} key={'res' + item.Restaurant.id} history={this.props.history} />
                            )
                        }
                        <li className='add-restaurant-container'>
                            <h6 className='add-restaurant' onClick={this.addNewRestaurant}>Tambah restaurant baru</h6>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.restaurant
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getRestaurant,
    createRestaurant
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);