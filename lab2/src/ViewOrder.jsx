import React from 'react';

function ViewOrder({ shoppingCart, inventory }) {
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
