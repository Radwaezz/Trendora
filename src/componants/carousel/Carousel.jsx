
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css'; // Style the carousel

const Carousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through the products every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3500); // Slow motion: change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <div className="carousel">
      <div className="carousel-item">
        <img src={products[currentIndex].image} alt={products[currentIndex].title} />
        <div className="carousel-info">
          <p>{`${currentIndex + 1} --- ${products[currentIndex].category}`}</p>
          <h3>{products[currentIndex].title}</h3>
        </div>
      </div>
      <div className="carousel-dots">
        {products.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

// Define prop types
Carousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
