// const express = require('express');
// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51PizZfDOHCsJOjIamE9V5ANPIGJDExIQDP63lxQprYm3jGemBQ8MCR42jWExnRkv8emgwtxcSXGWbzZ8qWy0RevE004diuUEAS');
// const app = express();

// app.use(express.json());

// // app.post('/create-payment-intent', async (req, res) => {
// //   const { amount, currency } = req.body;

// //   try {
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount,
// //       currency,
// //     });

// //     res.json({ clientSecret: paymentIntent.client_secret });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });
// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     // Your logic to create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       // session parameters
//     });
//     res.json({ id: session.id }); // Make sure to send a proper JSON response
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Internal Server Error' }); // Send a JSON error response
//   }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
// const express = require('express');
// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51PizZfDOHCsJOjIamE9V5ANPIGJDExIQDP63lxQprYm3jGemBQ8MCR42jWExnRkv8emgwtxcSXGWbzZ8qWy0RevE004diuUEAS'); // Use environment variable for this
// const app = express();

// app.use(express.json());

// app.post('/create-checkout-session', async (req, res) => {
//   const { cart } = req.body; // Make sure you receive the cart from the request body

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'], // Add other payment types if needed
//       line_items: cart.map(item => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.title,
//             images: [item.image], // Add image URLs if available
//           },
//           unit_amount: item.price * 100, // Amount in cents
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success', // Change to your success URL
//       cancel_url: 'http://localhost:3000/cancel', // Change to your cancel URL
//     });

//     res.json({ id: session.id }); // Send the session ID back to the client
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));


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