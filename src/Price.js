import React, { Component } from 'react';

class Price extends Component {
constructor(props){
    super(props)

    this.state = {
            price: props.price,
            
    };
}

    changeCurrency= ()=>{
       let currentPrice;
        if (this.state.price.includes('$')){
            currentPrice = parseFloat(this.state.price) * 500 + " AMD";
        }
        else {
            currentPrice = parseFloat(this.state.price) / 500 + " $"
        }

        this.setState({
          
        price: currentPrice,
            
        })

       
    }

       
    render() {
        return (
            <p> The price of product is {this.state.price}.  
            <button
                    onClick={this.changeCurrency}
            >
            Change the currency
            </button>
            </p>
        )
    }
}

export default Price;