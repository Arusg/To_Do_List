import React from 'react';
import { connect } from 'react-redux';

function Increment(props) {

    
    return (
        <div>
            <button
                onClick={props.onIncrement}
            >
                Count +
            </button>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
       onIncrement: () => {
            dispatch({ type: 'INCREMENT'});
        }
    };
};

export default connect(null, mapDispatchToProps)(Increment);