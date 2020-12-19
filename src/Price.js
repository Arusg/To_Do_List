import React, { Component } from 'react';

class Price extends Component {

    render() {
        return (
            <p> The price of product is {this.props.price}.</p>
        )
    }
}

export default Price;