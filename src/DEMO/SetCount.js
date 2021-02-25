import React, { useState } from 'react';
import Increment from './Increment';
import Decrement from './Decrement';

function SetCount() {

    return (
        <div>
            <Increment /> <br/>
            <Decrement /> <br/>
        </div>
    )
}


export default SetCount;