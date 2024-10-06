import React from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function Confirmation() {
  const { uuid } = useParams(); 
  const { shoppingCart } = useOutletContext(); 

  const confirmedSalad = shoppingCart.find((salad) => salad.uuid === uuid);

  if (!confirmedSalad) {
    return null;
  }

  return (
    <div className="alert alert-success mt-3">
      <h4>Salad Successfully Added!</h4>
      <p>
        Your salad with ID <strong>{uuid}</strong> has been added to your shopping cart.
      </p>
      <p>Total Price: {confirmedSalad.getPrice()} kr</p>
      <p>Ingredients: {Object.keys(confirmedSalad.ingredients).join(', ')}</p>
    </div>
  );
}

export default Confirmation;
