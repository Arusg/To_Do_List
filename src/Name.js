import React, { Component } from 'react';

class Name extends Component {
    

    render () {
        return (
            <p> The product name is {this.props.name}.</p>
        )
    }
}

export default Name;