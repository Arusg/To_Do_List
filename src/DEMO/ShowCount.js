import React from 'react';
import {connect} from 'react-redux';

function ShowCount(props){

    return(
        <h2>
        Count: {props.value}
        </h2>
    );
}

const mapStateToProps = (state)=>{
return {
    value: state.count,
    };

};


export default connect(mapStateToProps)(ShowCount);