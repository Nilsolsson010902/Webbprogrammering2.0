import React from 'react';

function ViewOrder({ shoppingCart, inventory }) {
  return (
    <div>
      {shoppingCart.map((salad) => (
        <div key={salad.uuid} className="salad-item">
          <h3>Salad {salad.uuid}</h3>
          <p>Foundation: {salad.foundation}</p>
          <p>Protein: {salad.protein}</p>
          <p>Dressing: {salad.dressing}</p>
          <p>
            Extras: {Object.keys(salad.extras).length > 0 ? 
            Object.keys(salad.extras).join(', ') : 'None'}
          </p>
          <p>Total Price: {salad.getTotalPrice(inventory)} kr</p>
        </div>
      ))}
    </div>
  );
}

export default ViewOrder;
