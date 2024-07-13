import React, { useState } from 'react';
import { auth } from '../firebase';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', image: 'Product1.jpg', price: 10 },
  { id: 2, name: 'Product 2', image: 'Product2.jpg', price: 15 },
  { id: 3, name: 'Product 3', image: 'Product3.jpg', price: 20 },
  { id: 4, name: 'Product 4', image: 'Product4.jpg', price: 25 },
  { id: 5, name: 'Product 5', image: 'Product5.jpg', price: 30 },
  { id: 6, name: 'Product 6', image: 'Product6.jpg', price: 35 },
  { id: 7, name: 'Product 7', image: 'Product7.jpg', price: 40 },
  { id: 8, name: 'Product 8', image: 'Product8.jpg', price: 45 },
  { id: 9, name: 'Product 9', image: 'Product9.jpg', price: 50 },
  { id: 10, name: 'Product 10', image: 'Product10.jpg', price: 55 },
];

function Home() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const goToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="home-container">
      <header className="top-header">
        <h2>Shippeddd</h2>
        <div className="header-buttons">
          <button onClick={goToCheckout} className="btn-checkout">Checkout</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>
      <h1>Get Your choices SHIPPEDD!!</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={`/${product.image}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <button 
              onClick={() => addToCart(product)} 
              className="btn-add" 
              style={{ backgroundColor: cart.find(item => item.id === product.id) ? 'green' : '#007bff' }}
              disabled={cart.find(item => item.id === product.id)}
            >
              {cart.find(item => item.id === product.id) ? 'ADDED!' : 'Add to Bag'}
              {cart.find(item => item.id === product.id) && <span>&#10004;</span>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
