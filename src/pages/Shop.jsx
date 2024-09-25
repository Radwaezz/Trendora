

import './Shop.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Share from '../../public/icons/share.svg';
import HeartEmpty from '../../public/icons/heart-empty.svg';
import HeartFilled from '../../public/icons/heart-fill.svg';

import 'react-toastify/dist/ReactToastify.css';
import useCartStore from '../store/useCartStore'; // استخدم useCartStore فقط
import FilterBar from '../componants/FilterBar/FilterBar';
import CartDropdown from '../componants/CartDropdown/CartDropdown'; // Import the CartDropdown component


function Shop() {
  const { addToCart, toggleLike, wishlist } = useCartStore(); // استدعاء toggleLike و wishlist من useCartStore
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    sort: '',
    priceRange: '',
    productsPerPage: 8,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for sidebar menu
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const category = filters.category || searchParams.get('category');

  //   let url = category
  //     ? `https://fakestoreapi.com/products/category/${category}`
  //     : 'https://fakestoreapi.com/products';

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       let filteredProducts = json;

  //       if (filters.priceRange) {
  //         const [min, max] = filters.priceRange.split('-').map(Number);
  //         filteredProducts = filteredProducts.filter(
  //           (product) => product.price >= min && product.price <= max
  //         );
  //       }

  //       if (filters.sort === 'name-asc') {
  //         filteredProducts = filteredProducts.sort((a, b) =>
  //           a.title.localeCompare(b.title)
  //         );
  //       } else if (filters.sort === 'name-desc') {
  //         filteredProducts = filteredProducts.sort((a, b) =>
  //           b.title.localeCompare(a.title)
  //         );
  //       }

  //       setProducts(filteredProducts);
  //       setTotalProducts(filteredProducts.length);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, [filters, location.search]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const searchParams = new URLSearchParams(location.search);
        const category = filters.category || searchParams.get('category');
        
        let url = category
          ? `https://fakestoreapi.com/products/category/${category}`
          : 'https://fakestoreapi.com/products';
  
        const response = await fetch(url);
        const json = await response.json();
        
        let filteredProducts = json;
  
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= min && product.price <= max
          );
        }
  
        if (filters.sort === 'name-asc') {
          filteredProducts = filteredProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        } else if (filters.sort === 'name-desc') {
          filteredProducts = filteredProducts.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
        }
  
        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load products.'); // Notify the user
      } finally {
        setLoading(false); // End loading
      }
    };
  
    fetchData();
  }, [filters, location.search]);
  
  // Render a loading message or spinner
  if (loading) return <div>Loading products...</div>;
  
  const indexOfLastProduct = currentPage * filters.productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - filters.productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(totalProducts / filters.productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (id, title) => {
    const encodedTitle = encodeURIComponent(title.replace(/ /g, '-'));
    navigate(`/product/${id}/${encodedTitle}`);
  };

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart(productWithQuantity);
    setIsSidebarOpen(true); // Open the sidebar when an item is added to the cart
    toast.success(`Product "${product.title}" added to cart`);
  };

  // Share function to open Facebook share dialog
  const handleShare = (product) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=Check%20out%20this%20product:%20${encodeURIComponent(product.title)}`;
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* FilterBar Component */}
      <FilterBar 
        filters={{ ...filters, productsPerPage: filters.productsPerPage.toString() }} 
        onFilterChange={handleFilterChange} 
      />

      {/* Products List */}
      <section className="product-grid">
        {currentProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => handleCardClick(product.id, product.title)}
          >
            <img className='hero-product-image' src={product.image} alt={product.title} />
            
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <div className="price-container">
              <span className="price">${product.price}</span>
              <span className="old-price">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            {/* Add to cart button */}
            <button
              className="overlay-content"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to cart
            </button>

            {/* Share and Like buttons */}
            <div className="action-buttons">
              <button
                className="share-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(product);
                }}
              >
                <img src={Share} alt="Share" />
                Share
              </button>
              <button
                className="like-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(product); // استخدام toggleLike من useCartStore
                }}
              >
                <img
                  className="like-icon"
                  src={wishlist.some((item) => item.id === product.id) ? HeartFilled : HeartEmpty} // تحديث الحالة باستخدام wishlist
                  alt="Like"
                />
                {wishlist.some((item) => item.id === product.id) ? 'Unlike' : 'Like'}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}

        {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && currentPage < 10 && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>

      {/* Sidebar for cart */}
      {isSidebarOpen && <CartDropdown onClose={() => setIsSidebarOpen(false)} />} {/* Cart dropdown is opened when isSidebarOpen is true */}

      <ToastContainer /> {/* Toast container for notifications */}
    </>
  );
}

export default Shop;
