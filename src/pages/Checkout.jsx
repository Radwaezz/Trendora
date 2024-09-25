



import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import './Checkout.css';


const stripePromise = loadStripe('pk_test_51PizZfDOHCsJOjIapZFvCE2wsB6vyeBwESuZO8yPHJJ8RodklguILKOQ0oV7mKgDFPW2ofsDGoJwG7pBxiH0dJAL00ZZkLx2pA');

const Checkout= () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .max(15, 'Name cannot be more than 15 characters long')
      .required('This field is required'),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Invalid email address"
      )
      .required("Email is Required"),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);

    if (values.paymentMethod === 'stripe') {
      try {
        const stripe = await stripePromise;

        const response = await fetch('http://localhost:3000/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart,
            customer: values,
          }),
        });

        const responseText = await response.text();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
        }

        let session;
        try {
          session = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`Failed to parse JSON: ${e.message}. Response was: ${responseText}`);
        }

        if (!session || !session.id) {
          throw new Error('Invalid session data received from server');
        }

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
          throw new Error(result.error.message);
        }

        navigate('/placeorder');

      } catch (error) {
        console.error('Checkout error:', error);
        setError(`An error occurred during checkout: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setTimeout(() => {
        setError(null);
        alert(`Order placed successfully with ${values.paymentMethod}!`);
        setIsSubmitting(false);
        navigate('/placeorder');
      }, 2000);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.title} />
                      <span className='product-title'>{item.title}</span>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No items in cart</td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="summary-total">
            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>

        <Formik
          initialValues={{
            name: '',
            email: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            paymentMethod: 'stripe',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" required />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" required />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field type="text" id="address" name="address" required />
                <ErrorMessage name="address" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field type="text" id="city" name="city" required />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <Field type="text" id="postalCode" name="postalCode" required />
                <ErrorMessage name="postalCode" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <Field type="text" id="country" name="country" required />
                <ErrorMessage name="country" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                   <label>
                    <Field
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                    />
                    PayPal
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                    />
                    Stripe
                  </label>
                 
                </div>
                <ErrorMessage name="paymentMethod" component="div" className="error" />
              </div>
              <button 
                className='order-btn' 
                type="submit" 
                disabled={!isValid || !dirty || isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Checkout;
