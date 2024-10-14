
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner'
import Salad from './Salad'

function App(props) {


 const handleAddSalad = (salad) => {                    //adds salad when user submits one
  const updatedCart = [...shoppingCart, salad];
  setShoppingCart(updatedCart);
  localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));

};

  const initializeShoppingCart = () => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart){
      const parsedCart = JSON.parse(storedCart).map((saladData) => Salad.parse(saladData));
      return parsedCart;
    } else{
    return [];
    }
  }

 const [shoppingCart, setShoppingCart] = useState(initializeShoppingCart); //shopping cart state variable
 const navigation = useNavigation();
 const isLoading = navigation.state === 'loading'
 
 const clearCart = () => {
  setShoppingCart([]);
  localStorage.removeItem('shoppingCart'); // Optionally clear local storage
};


return (
  <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>

    {/* Navigation bar */}
    <Navbar />

    {/* Show spinner if loading; otherwise, render Outlet with context */}
    {isLoading ? (
      <BootstrapSpinner />
    ) : (
      <Outlet context={{ handleAddSalad, shoppingCart, clearCart }} />
    )}

    <footer className="pt-3 mt-4 text-muted border-top">EDAF90 - webprogrammering</footer>
  </div>
);
}


export default App;
