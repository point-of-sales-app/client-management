import React, { Component } from 'react';
import * as MaterialDesign from 'react-icons/lib/md'

class RestaurantItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    redirect = () => {
        localStorage.setItem('resid', this.props.data.Restaurant.id);
        this.props.history.push('/member-area/dashboard')
    }

    render() {
        return (
            <li id={this.props.data.Restaurant.id} className='restaurant-item-container' onClick={this.redirect}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-auto padding-0'>
                            <MaterialDesign.MdStore size={48}/>
                        </div>
                        <div className='col'>
                            <h6>{this.props.data.Restaurant.name}</h6>
                            <p>{this.props.data.Restaurant.address}</p>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default RestaurantItem;
