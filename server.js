const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-order', async (req, res) => {
  const amount = req.body.amount;
  const currency = req.body.currency || 'INR';

  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: 'receipt#1',
      payment_capture: 1,
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
