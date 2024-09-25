
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../componants/carousel/Carousel';
import './About.css';  

const About = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Add a loading state
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

  return (
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
  );
}

export default About;
