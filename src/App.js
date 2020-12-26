import React from 'react';
import './App.css';
import Product from './Product';
import ToDo from './components/toDoList';


function App() {
  return (
    <div className="App">
      <ToDo />
      <Product 
        name="bananas" 
        price="1 $" 
        description="Fresh bananas from Ecuador" 
      />
      
     
    </div>
  );
}

export default App;
