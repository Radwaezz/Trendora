
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCartStore from '../../store/useCartStore';
import Delete from '../../../public/icons/cart-modal-close-icon-3f317b22.svg';
import EmptyCartImage from '../../../public/images/shopping-removebg-preview.png';
import { motion } from 'framer-motion'; 
import './CartDropdown.css';

function CartDropdown({ onClose }) {
  const navigate = useNavigate();
  const { cart, cartTotalPrice, removeFromCart } = useCartStore();
  const totalPrice = cartTotalPrice();

  const handleViewCartClick = () => {
    navigate('/cart');
    if (onClose) {
      onClose();
    }
  };

  const handleRemoveItem = (id) => {
    const removedItem = cart.find(item => item.id === id);
    removeFromCart(id);

    toast.success(`Item "${removedItem?.title}" removed from the cart.`, {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  // Animation variants for sidebar
  const sidebarVariants = {
    open: {
      x: 0, // Sidebar slides in from the right
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
    closed: {
      x: '100%', // Sidebar slides out to the right
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
  };

  // Animation variants for overlay
  const overlayVariants = {
    open: {
      opacity: 1, // Fully visible
      transition: { duration: 0.3 }, // Duration for fade-in
    },
    closed: {
      opacity: 0, // Fully hidden
      transition: { duration: 0.3 }, // Duration for fade-out
    },
  };

  return (
    <div className="cart-wrapper">
      {/* Motion div for the overlay with fade in/out animation */}
      <motion.div
        className="overlay"
        initial="closed"
        animate="open"
        exit="closed"
        variants={overlayVariants}
        onClick={onClose}
      ></motion.div>

      {/* Motion div for the sliding sidebar */}
      <motion.div
        className="cart-side-menu"
        initial="closed"
        animate="open"
        exit="closed"
        variants={sidebarVariants}
      >
        <button className="close-btn" onClick={onClose}>
          <img src={Delete} alt="Close" />
        </button>
        <h3 className='cart-title'>Shopping Cart</h3>
        <hr />
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src={EmptyCartImage} alt="Empty Cart" className="empty-cart-image" />
            <p className="empty-cart-message">
              No items in the cart{' '}
              <a className="link-cart" href="/shop">
                go to <br /> shop page
              </a>
            </p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <button className='item-btn'>
                  <img src={item.image} alt={item.title} className="item-image" />
                </button>
                <div className="item-details">
                  <p className="item-title">{item.title}</p>
                  <p className="item-quantity-price">
                    <span className="quantityy">{item.quantity}</span>
                    <span className="pricey">x</span>${item.price ? item.price.toFixed(2) : '0.00'}
                  </p>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="cart-footer">
          <p className="subtotal">
            Subtotal: <span>${totalPrice.toFixed(2)}</span>
          </p>
          <button className="view-cart-btn" onClick={handleViewCartClick}>
            View Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CartDropdown;

