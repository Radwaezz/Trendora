
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import Counter from '../componants/Counter/Counter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartDropdown from '../componants/CartDropdown/CartDropdown'; // Import CartDropdown
import './SingleProduct.css';

// Modal Component
function ImageModal({ imageUrl, onClose }) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <img src={imageUrl} alt="Product" className="modal-image" />
      </div>
    </div>
  );
}

function SingleProduct() {
  const { id, name } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [rating, setRating] = useState(0);
  const { addToCart, toggleCart, isCartOpen } = useCartStore();

  // useEffect(() => {
  //   fetch(`https://fakestoreapi.com/products/${id}`)
  //     .then(res => res.json())
  //     .then(json => setProduct(json))
      
  //     .catch(error => console.error('Error fetching data:', error));
  // }, [id]);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setRating(json.rating?.rate || 0);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity,userRating: rating  });
    toast.success(`Added ${quantity} "${product.title}" to cart`);
    toggleCart();
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal when image is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const decodedName = decodeURIComponent(name).replace(/-/g, ' ');

  return (
    <>
      <div className="breadcrumb-single">
        <p>
          <a href="/">Home</a>
          <span className="breadcrumb-separator"></span>
          <a href="/shop"> Shop</a>
          <span className="breadcrumb-separator"></span>
          <span className="breadcrumb-pipe"></span>
          <span className="breadcrumb-title">{decodedName}</span>
        </p>
      </div>

      <div className="product-page">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt="Main Product" onClick={handleImageClick} className="clickable-image" />
          </div>
        </div>
        <div className="product-details">
          <h1>{decodedName}</h1>
        
          <div className="prices">
          <span className="price">${product.price}</span>
          <span className="old-price">${(product.price * 1.2).toFixed(2)}</span>
          </div>
        <div className="main-rating">
  <div className="rating">
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingChange(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★ 
        </span>
      ))}
    </div>
    <div className="rating-text">
      <span>({rating.toFixed(1)})</span>
      <span className="rating-count"> | {product.rating?.count} Customer Reviews</span>
    </div>
  </div>
</div>

          <div className="descri">
            <p className="description">{product.description}</p>
          </div>
          <div className="btns">
            <Counter quantity={quantity} setQuantity={setQuantity} />
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
        {isCartOpen && <CartDropdown onClose={toggleCart} />}
        <ToastContainer />
      </div>

      <div className="related-desc">
        <h3 className="title-desc">Description</h3>
        <div className="desc-content">
          <p>{product.description}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ImageModal imageUrl={product.image} onClose={handleCloseModal} />}
    </>
  );
}

export default SingleProduct;
