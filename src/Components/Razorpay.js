// import React from 'react';
// import './Razorpay.css';
// import { useNavigate } from 'react-router-dom';

// function Razorpay() {
//   const navigate = useNavigate();

//   const handleCompletePayment = () => {
//     // Handle payment completion logic here
//     alert('Payment completed successfully!');
//     navigate('/home');
//   };

//   return (
//     <div className="razorpay-container">
//       <h2>Payment</h2>
//       <p>Proceed to complete your payment using Razorpay.</p>
//       <button onClick={handleCompletePayment} className="btn-payment">Complete Payment</button>
//     </div>
//   );
// }

// export default Razorpay;
import React from 'react';
import './Razorpay.css';
import { useNavigate } from 'react-router-dom';

function Razorpay() {
  const navigate = useNavigate();

  const handleCompletePayment = () => {
    // Handle payment completion logic here
    alert('Payment completed successfully!');
    navigate('/home');
  };

  return (
    <div className="razorpay-container">
      <h2>Payment</h2>
      <p>Proceed to complete your payment using Razorpay.</p>
      <button onClick={handleCompletePayment} className="btn-payment">Complete Payment</button>
    </div>
  );
}

export default Razorpay;
