
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../componants/carousel/Carousel';
import { motion } from 'framer-motion';
import fearturedOne from '/images/mn.jfif';
import fearturedTwo from '/images/women-wear.jfif';
import featuredThree from '/images/featured2.jfif';
import featuredFour from '/images/head.jfif';
import trendoraImg from '/images/trendora-shop.jfif';
import './About.css';  

const About = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Add a loading state
  const [modalImage, setModalImage] = useState(null);  // To track the clicked image for modal
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch products from API using fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);  // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);  // Stop loading even on error
      }
    };
    
    fetchProducts();
  }, []);

  // Show a loading message until data is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle explore button click
  const handleExploreMore = () => {
    navigate('/shop'); 
  };

  // Handle image click to open modal
  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
  };

  // Close modal
  const closeModal = () => {
    setModalImage(null);
  };

  // Featured products array
  const featuredProducts = [
    { src: fearturedOne, alt: "Modern Men's Collection", name: "Modern Men's Collection" },
    { src: fearturedTwo, alt: "Chic Women's Accessories", name: "Chic Women's Accessories" },
    { src: featuredThree, alt: "Elegant Women's Ensemble", name: "Elegant Women's Ensemble" },
    { src: featuredFour, alt: 'Luxury Sound Moments', name: 'Luxury Sound Moments' }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="about-container"
      >
        {/* Header */}
        <motion.header
          className="about-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <h1>About Our Shop</h1>
          <p>Crafting quality products with passion and creativity.</p>
        </motion.header>

        {/* Our Story Section with an animated image */}
        <section className="about-content">
          <motion.img
            src={trendoraImg}
            alt="About Our Shop"
            className="about-image"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
          />
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2>Our Story</h2>
            <p>
              We started our journey in 2010 with a passion for designing and selling high-quality products. From humble beginnings, we’ve grown into a shop that values craftsmanship and creativity.
            </p>
            <h2>Our Mission</h2>
            <p>To inspire creativity and bring beautifully designed products into everyday life.</p>
          </motion.div>
        </section>
       
        {/* Product Highlights */}
        <motion.section
          className="product-highlights"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <h2>Our Featured Products</h2>
          {/* <div className="product-list">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                className="product-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImageClick(product.src)}  // Set modal image on click
              >
                <img src={product.src} alt={product.alt} />
                <p>{product.name}</p>
              </motion.div>
            ))}
          </div> */}
          <div className="product-list">
  {featuredProducts.map((product, index) => (
    <motion.div
      key={index}
      className={`product-item ${index === 3 ? 'small-height' : ''}`} // Add class to the fourth image
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleImageClick(product.src)}
    >
      <img src={product.src} alt={product.alt} />
      <p>{product.name}</p>
    </motion.div>
  ))}
</div>

        </motion.section>
      </motion.div>

      {/* Modal Component */}
      {modalImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={modalImage} alt="Featured Product" />
          </div>
        </div>
      )}

      <div className="about-section">
        <div className="info-section">
          <h1>50+ Beautiful Collection Inspiration</h1>
          <p>Our designer already made a lot of beautiful prototypes of Collections that inspire you.</p>
          <button className="explore-button" onClick={handleExploreMore}>EXPLORE MORE</button>
        </div>
        <div className="carousel-section">
          <Carousel products={products} />
        </div>
      </div>
    </>
  );
};

export default About;
