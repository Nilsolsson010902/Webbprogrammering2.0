import React from 'react';
import { useOutletContext, Outlet } from 'react-router-dom';
import {useState} from 'react'

function ViewOrder() {
  const { shoppingCart } = useOutletContext();

  const [confirmation, setConfirmation] = useState();
  const [showToast, setShowToast] = useState(false);

  const prepareOrder = () => {
    return shoppingCart.map((salad) => Object.keys(salad.ingredients))
  }

  const placeOrder = async () => {
    const order = prepareOrder();
    const response = await fetch('http://localhost:8080/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    const result = await response.json();
    setConfirmation(result);
    setShowToast(true);
  }


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
      <button className = "btn btn-primary mt-3" onClick={placeOrder}>
        Place Order
      </button>
      {showToast && confirmation && (
        <div
          className="toast show position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-header">
            <strong className="me-auto">Order Confirmation</strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">
            <p>Order Status: {confirmation.status}</p>
            <p>Order ID: {confirmation.uuid}</p>
            <p>Price: {confirmation.price} kr</p>
            <p>Timestamp: {confirmation.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewOrder;

