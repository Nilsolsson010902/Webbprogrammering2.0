import React from 'react';
import { useOutletContext, Outlet } from 'react-router-dom';

function ViewOrder() {
  const { shoppingCart } = useOutletContext();


  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div>
          {shoppingCart.map((salad) => (
            <div key={salad.uuid} className="salad-item border p-3 mb-2">
              <h3>Salad {salad.uuid}</h3>
              <p>Ingredients: {Object.keys(salad.ingredients).join(', ')}</p>
              <p>Total Price: {salad.getPrice()} kr</p>
            </div>
          ))}
        </div>
      )}
      {/* Render child routes here */}
      <Outlet context = { {shoppingCart }} />
    </div>
  );
}

export default ViewOrder;

