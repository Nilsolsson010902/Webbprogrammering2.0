
import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import { useState } from 'react';
import ViewOrder from './ViewOrder';


function App() {
 let extras = Object.keys(inventory).filter(name => inventory[name].extra);

 const [shoppingCart, setShoppingCart] = useState([]); //shopping cart state variable

 const handleAddSalad = (salad) => {                    //adds salad when user submits one
  setShoppingCart((prevCart) => [...prevCart, salad]);
};



 return (
   <div className="container py-4">
     <header className="pb-3 mb-4 border-bottom">
       <span className="fs-4">Min egen salladsbar</span>
     </header>



     <ComposeSalad inventory={inventory} addSalad ={handleAddSalad}></ComposeSalad>
     <ViewOrder shoppingCart={shoppingCart} inventory={inventory} />


     <footer className="pt-3 mt-4 text-muted border-top">
       EDAF90 - webprogrammering
     </footer>
   </div>
 );
}


export default App;
