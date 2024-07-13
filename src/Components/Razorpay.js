import React, { useEffect, useState } from 'react';
import './Razorpay.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Razorpay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, shipmentDetails } = location.state || { cart: [], shipmentDetails: {} };

  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCompletePayment = async () => {
    if (!validateShipmentDetails()) {
      setError('Please fill in all required fields in the shipment details.');
      return;
    }

    setError(null);

    // Calculate the total amount in USD
    const amountUSD = cart.reduce((sum, item) => sum + item.price, 0);

    // Convert the amount to INR (assume 1 USD = 75 INR for this example, adjust as needed)
    const amountINR = amountUSD * 75 * 100; // Amount in paisa

    try {
      // Create an order on the backend
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountINR, currency: 'INR' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      const options = {
        key: 'rzp_test_Ci0ik9gDEgoJZZ', // Replace with your key_id
        amount: order.amount, // Amount in paisa
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id, // This is the order ID obtained from the backend
        handler: function (response) {
          alert('Payment successful!');
          navigate('/home');
        },
        prefill: {
          name: shipmentDetails && shipmentDetails.firstName ? `${shipmentDetails.firstName} ${shipmentDetails.lastName}` : '',
          contact: shipmentDetails && shipmentDetails.countryCode && shipmentDetails.phone ? `${shipmentDetails.countryCode} ${shipmentDetails.phone}` : '',
        },
        theme: {
          color: '#007bff',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment failed', error);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  const validateShipmentDetails = () => {
    return (
      shipmentDetails &&
      shipmentDetails.firstName &&
      shipmentDetails.lastName &&
      shipmentDetails.countryCode &&
      shipmentDetails.phone
    );
  };

  return (
    <div className="razorpay-container">
      <header className="top-header">
        <h2>Shippeddd</h2>
        <button onClick={() => navigate('/home')} className="btn-home">Home</button>
      </header>
      <h1 className="PHeading">Payment</h1>
      <div className="razorpay-content">
        <div className="left-column box">
          <h3 className="section-title">Order Details</h3>
          <div className="order-details">
            <p><strong>Name:</strong> {shipmentDetails && shipmentDetails.firstName ? `${shipmentDetails.firstName} ${shipmentDetails.lastName}` : ''}</p>
            <p><strong>Address:</strong> {shipmentDetails && shipmentDetails.flatNo ? `${shipmentDetails.flatNo}, ` : ''}
              {shipmentDetails && shipmentDetails.city ? `${shipmentDetails.city}, ` : ''}
              {shipmentDetails && shipmentDetails.state ? `${shipmentDetails.state}, ` : ''}
              {shipmentDetails && shipmentDetails.pincode ? `${shipmentDetails.pincode}` : ''}
            </p>
            <p><strong>Phone:</strong> {shipmentDetails && shipmentDetails.countryCode && shipmentDetails.phone ? `${shipmentDetails.countryCode} ${shipmentDetails.phone}` : ''}</p>
          </div>
          <div className="cart">
            <h4 className="cart-title">Your Cart</h4>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <div className="total-amount">
              <h4>Total Amount: ${cart.reduce((sum, item) => sum + item.price, 0)}</h4>
            </div>
          </div>
        </div>
        <div className="partition"></div>
        <div className="right-column box">
          <h3 className="section-title">Payment</h3>
          {error && <p className="error-message">{error}</p>}
          <p>Proceed to complete your payment using Razorpay.</p>
          <button onClick={handleCompletePayment} className="btn-payment">Complete Payment</button>
        </div>
      </div>
      <footer className="footer">
        <p>Made by Kinjal Jain | Email: kinjaljn2811@gmail.com</p>
      </footer>
    </div>
  );
}

export default Razorpay;
