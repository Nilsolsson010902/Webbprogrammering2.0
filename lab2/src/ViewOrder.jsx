import React from 'react';
import { useOutletContext } from 'react-router-dom';


function ViewOrder() {

  const { shoppingCart } = useOutletContext();
  console.log('Shopping Cart in ViewOrder:', shoppingCart);
  return (
    <div>
      {shoppingCart.map((salad) => (
        <div key={salad.uuid} className="salad-item">
          <h3>Salad {salad.uuid}</h3>
          <p>Ingredients: {Object.keys(salad.ingredients).join(', ')}</p>
          <p>Total Price: {salad.getPrice()} kr</p>
        </div>
      ))}
    </div>

  );
}

export default ViewOrder;
