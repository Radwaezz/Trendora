
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useCartStore from '../../store/useCartStore';
import Delete from '/icons/trash-043182f4.svg'; 
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Cart() {
  const { cart, cartTotalItems, addToCart, removeFromCart } = useCartStore();
  const [loadingId, setLoadingId] = useState(null); // Track the product ID being deleted
  const navigate = useNavigate(); 

  // Fetch cart data from API (if applicable)
  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/5')
      .then(res => res.json())
      .then(json => {
        json.forEach(cartItem => addToCart(cartItem));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [addToCart]);

  const handleDeleteProduct = (id) => {
    setLoadingId(id); // Set loading state for the product being deleted
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        const deletedProduct = cart.find(item => item.id === id);
        toast.success(`Product "${deletedProduct?.title}" (ID: ${id}) was deleted successfully.`, {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        removeFromCart(id); // Remove product from Zustand store
        setLoadingId(null); // Reset loading state after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        toast.error('There was a problem deleting the product. Please try again.', {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setLoadingId(null); // Reset loading state if an error occurs
      });
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to the Checkout page
  };

  // Calculate subtotal by summing up item price * quantity
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const handleBackToShop = () => {
        navigate('/shop'); // Redirect to the Shop page
      };
    
  return (
    <div className="container">
      <ToastContainer /> {/* Toast container for displaying messages */}
      <div className="cart-items">
        <table>
          <thead className="table-header">
            <tr>
              <th className="product">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id}>
                  <td className="product">
                    <div className="product-content">
                      <img src={item.image} alt={item.title} className="product-image" />
                      <span className="product-name">{item.title}</span>
                    </div>
                  </td>
                  <td className="product-price">${item.price.toFixed(2)}</td>
                  <td className='quantity-td'>{item.quantity}</td>
                  <td >${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    {loadingId === item.id ? (
                      <span className="spinner">Loading...</span> // Spinner or loading text
                    ) : (
                      <img
                        src={Delete}
                        alt="Delete"
                        className="delete-icon"
                        onClick={() => handleDeleteProduct(item.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items in cart</td>
              </tr>
            )}
          </tbody>
         


        </table>
       <button className="back-to-shop-btn" onClick={handleBackToShop}>Back to Shop</button> 

      </div>

      {/* Cart Totals Section */}
      <div className="cart-totals">
  <h2>Cart Totals</h2>
  <p>Total Items: <span>{cartTotalItems()}</span></p> {/* Display total item count */}
  <p>Subtotal: <span>${calculateSubtotal().toFixed(2)}</span></p> {/* Display subtotal */}
  
  {/* Get the price of the first product (or any logic you prefer) */}
  <p>Total: <span className="total-price">{cart.length > 0 ? `$${cart[0].price.toFixed(2)}` : '$0.00'}</span> </p> {/* Display price of a single item */}
  
  <button className="checkout-btn" onClick={handleCheckout}>Check Out</button> {/* Checkout button */}
</div>

    </div>
  );
}

export default Cart;



