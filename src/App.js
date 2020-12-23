import './App.css';
import Header from './Header';
import Product from './Product';

function App() {
  return (
    <div className="App">
      <Product 
        name="bananas" 
        price="1 $" 
        description="Fresh bananas from Ecuador" 
      />
      <Header />
     
    </div>
  );
}

export default App;
