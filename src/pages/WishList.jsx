



import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import './WishList.css';

function WishList() {
  const { wishlist, removeFromWishlist, initializeWishlist } = useCartStore();

  useEffect(() => {
    initializeWishlist(); 
  }, [initializeWishlist]);

  return (
    <div className="wishlist-container">
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <strong>{item.title}</strong>
              <p>{item.price} $</p>
            </div>
            <div className="item-remove">
              <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                &times;
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <p className="empty-message">Your wishlist is empty.</p>
          <div className="go-shop-container">
            <p className="go-shop-message">
              <span className="quote">&quot; </span>
              Step into Style: Explore the Latest Trends and Must-Have Pieces!
              <span className="quote">&quot;</span>
            </p>
            <Link to="/shop">
              <button className="go-shop-btn">Go To Shop</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default WishList;
