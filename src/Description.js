import React, { Component } from 'react';

class Description extends Component {
    

    render() {
        
        return (
            <p> The description of product is "{this.props.description}".</p>
        )
    }
}

export default Description;