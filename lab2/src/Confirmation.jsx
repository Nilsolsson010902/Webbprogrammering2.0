import React from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function Confirmation() {
  const { uuid } = useParams(); 
  const { shoppingCart } = useOutletContext(); // Expecting shoppingCart to be passed via context

  // Handle loading state, return nothing if shoppingCart is undefined
  if (shoppingCart === undefined) {
    return null; // Don't render anything while shoppingCart is undefined
  }

  // Handle the case where the shopping cart is empty, return nothing
  if (shoppingCart.length === 0) {
    return null; // Don't render anything if the cart is empty
  }

  // Find the salad with the matching UUID in the shoppingCart
  const confirmedSalad = shoppingCart.find((salad) => salad.uuid === uuid);

  if (!confirmedSalad) {
    // Return nothing if the UUID doesn't match any salad
    return null;
  }

  // Only display the success message if we find the confirmed salad
  return (
    <div className="alert alert-success mt-3">
      <h4>Salad Successfully Added!</h4>
      <p>
        Your salad with ID <strong>{uuid}</strong> has been added to your shopping cart.
      </p>
      <p>Total Price: {confirmedSalad.getPrice()} kr</p>
    </div>
  );
}

export default Confirmation;
