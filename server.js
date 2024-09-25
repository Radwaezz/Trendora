


const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const stripe = Stripe('sk_test_51PizZfDOHCsJOjIamE9V5ANPIGJDExIQDP63lxQprYm3jGemBQ8MCR42jWExnRkv8emgwtxcSXGWbzZ8qWy0RevE004diuUEAS');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  console.log('Received request to create checkout session');
  console.log('Request body:', req.body);

  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    console.error('Invalid cart data');
    return res.status(400).json({ error: 'Invalid cart data' });
  }

  try {
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log('Creating Stripe checkout session with line items:', lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    console.log('Stripe session created:', session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));