import { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import './PlaceOrder.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlaceOrder() {
  const { cart, cartTotalItems } = useCartStore();
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    paymentMethod: 'creditCard',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://fakestoreapi.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          ...orderDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();

      toast.success('Your order has been placed successfully!', {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      useCartStore.getState().clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was a problem placing your order. Please try again.', {
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToShop = () => {
    window.location.href = '/checkout'; // Replace with your shop's path
  };

  return (
    <div className="placeholder-place-order">
      <ToastContainer />

      <div className="placeholder-checkout">
        <h1>Place Your Order</h1>
        <form className="order-form">
          <div className="placeholder-form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleChange}
                required
                className="placeholder-card-element"
              />
            </label>
          </div>
          <div className="placeholder-form-group">
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={orderDetails.address}
                onChange={handleChange}
                required
                className="placeholder-card-element"
              />
            </label>
          </div>
          <div className="placeholder-form-group">
            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={orderDetails.paymentMethod}
                onChange={handleChange}
                className="placeholder-card-element"
              >
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={loading}
            className="placeholder-button"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>Total Items: {cartTotalItems()}</p>
          <p>
            Total Price: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>

        {/* Back to Shop Button */}
        <button
          onClick={handleBackToShop}
          className="placeholder-button back-to-shop-button"
        >
          Back to CheckOut
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
