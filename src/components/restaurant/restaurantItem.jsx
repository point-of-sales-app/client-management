import React, { Component } from 'react';

class RestaurantItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    redirect = () => {
        localStorage.setItem('resid', this.props.data.Restaurant.id);
        this.props.history.push('/member-area/dashboard')
    }

    render() { 
        return ( 
            <li id={this.props.data.Restaurant.id} className='restaurant-item-container' onClick={this.redirect}>
                <h6>{this.props.data.Restaurant.name}</h6>
                <p>{this.props.data.Restaurant.address}</p>
            </li>
         )
    }
}
 
export default RestaurantItem;