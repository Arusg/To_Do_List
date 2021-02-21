import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Counter from './DEMO/Counter';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

const defaultState = { 
    count: 0
};
export default function reducer(state=defaultState, action){
    
    switch(action.type){
      case 'INCREMENT':{
        return {
          ...state,
          count: state.count+1
        };
      }
      case 'DECREMENT':{
        return {
          ...state,
          count: state.count-1
        };
      }
      default: return state;
    }
  }

    const store  = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
