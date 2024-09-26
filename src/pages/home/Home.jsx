
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import homeImage from '/images/ele.jfif';
import imageOne from '/images/acc.jfif';
import imageThree from '/images/men.jfif';
import imageTwo from '/images/women.jfif';


function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const categoryImages = {
    electronics: homeImage,
    jewelery: imageOne,
    "men's clothing":imageThree,
    "women's clothing": imageTwo,
  };

  const categoryLinks = {
    electronics: '/shop?category=electronics',
    jewelery: '/shop?category=jewelery',
    "men's clothing": '/shop?category=men%27s%20clothing',
    "women's clothing": '/shop?category=women%27s%20clothing',
  };
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);



  const handleCategoryClick = (category) => {
    navigate(categoryLinks[category]);
  };

  return (
    <>
      <section className="categories">
        <h2>Categories</h2>
        <div className="category-container">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card" 
              onClick={() => handleCategoryClick(category)}
            >
              <img className='category-image' src={categoryImages[category]} alt={category} />
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </section>
     
    </>
  );
}

export default Home;
