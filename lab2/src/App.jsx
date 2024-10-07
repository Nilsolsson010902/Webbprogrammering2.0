
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';

function App(props) {


 const [shoppingCart, setShoppingCart] = useState([]); //shopping cart state variable



 const handleAddSalad = (salad) => {                    //adds salad when user submits one
  setShoppingCart([...shoppingCart, salad]);

};

 return (
 
   <div className="container py-4">
     <header className="pb-3 mb-4 border-bottom">
       <span className="fs-4">Min egen salladsbar</span>
     </header>
     <Navbar></Navbar>

     <Outlet context={{ handleAddSalad, shoppingCart}} />

     <footer className="pt-3 mt-4 text-muted border-top">
       EDAF90 - webprogrammering
     </footer>
   </div>
   

 );
}


export default App;
