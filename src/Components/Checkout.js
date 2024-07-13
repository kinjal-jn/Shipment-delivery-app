import React, { useState } from 'react';
import './Checkout.css';
import { useNavigate, useLocation } from 'react-router-dom';

const countryCodes = [
  { name: 'India', code: '+91' },
  { name: 'United States', code: '+1' },
  { name: 'Canada', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Australia', code: '+61' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Italy', code: '+39' },
  { name: 'Spain', code: '+34' },
  { name: 'Japan', code: '+81' },
];

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const [shipmentDetails, setShipmentDetails] = useState({
    firstName: '',
    lastName: '',
    flatNo: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    countryCode: '+91',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleOrder = () => {
    const requiredFields = ['firstName', 'lastName', 'flatNo', 'city', 'state', 'pincode', 'phone'];
    const isAllFilled = requiredFields.every(field => shipmentDetails[field].trim() !== '');

    if (isSaved && isAllFilled) {
      navigate('/razorpay', { state: { cart, shipmentDetails } });
    } else {
      alert('Please fill all shipment details before proceeding to payment.');
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-container">
      <header className="top-header">
        <h2>Shippeddd</h2>
        <button onClick={() => navigate('/home')} className="btn-home">Home</button>
      </header>
      <h1 className="checkout-title">Check Out the Checked Outfit!!</h1>
      <div className="checkout-content">
        <div className="left-column box">
          <h3 className="section-title">Shipment Details</h3>
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={shipmentDetails.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={shipmentDetails.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="flatNo"
            placeholder="Flat No. *"
            value={shipmentDetails.flatNo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City *"
            value={shipmentDetails.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State *"
            value={shipmentDetails.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode *"
            value={shipmentDetails.pincode}
            onChange={handleInputChange}
          />
          <div className="phone-input">
            <select
              name="countryCode"
              value={shipmentDetails.countryCode}
              onChange={handleInputChange}
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} {country.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={shipmentDetails.phone}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave} className="btn-save">Save Details</button>
          {!isSaved && (
            <p className="error-message">* Please fill all required fields</p>
          )}
        </div>
        <div className="partition"></div>
        <div className="right-column box">
          <h3 className="section-title">Order Summary</h3>
          {isSaved && Object.values(shipmentDetails).every(detail => detail.trim() !== '') ? (
            <>
              <div className="order-details">
                <p><strong>Name:</strong> {shipmentDetails.firstName} {shipmentDetails.lastName}</p>
                <p><strong>Address:</strong> {shipmentDetails.flatNo}, {shipmentDetails.city}, {shipmentDetails.state}, {shipmentDetails.pincode}</p>
                <p><strong>Phone:</strong> {shipmentDetails.countryCode} {shipmentDetails.phone}</p>
              </div>
              <div className="cart">
                <h4 className="cart-title">Your Cart</h4>
                {cart.length === 0 ? (
                  <p className="empty-cart-message"><strong>Your cart is empty?! Happy shopping :)</strong></p>
                ) : (
                  <>
                    <ul>
                      {cart.map((item, index) => (
                        <li key={index}>
                          {item.name} - ${item.price}
                        </li>
                      ))}
                    </ul>
                    <div className="total-amount">
                      <h4>Total Amount: ${totalAmount}</h4>
                    </div>
                  </>
                )}
              </div>
              <button onClick={handleOrder} className="btn-order">Proceed to Payment</button>
            </>
          ) : (
            <div className="cart">
              <p>Please fill your details for Payment Gateway</p>
              <h4 className="cart-title">Items in Bag:</h4>
              {cart.length === 0 ? (
                <p className="empty-cart-message"><strong>Looks like there is nothing here! Happy shopping :)</strong></p>
              ) : (
                <>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${item.price}
                      </li>
                    ))}
                  </ul>
                  <div className="total-amount">
                    <h4>To Pay: ${totalAmount}</h4>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>Made by Kinjal Jain | Email: kinjaljn2811@gmail.com</p>
      </footer>
    </div>
  );
}

export default Checkout;
