import React from 'react';
import './Checkout.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const handleOrder = () => {
    // Handle order logic here
    navigate('/razorpay');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleOrder} className="btn-order">Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;
