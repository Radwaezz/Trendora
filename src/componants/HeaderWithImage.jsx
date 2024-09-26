
import { useLocation, Link } from 'react-router-dom';
import Header from '../layouts/header/Header'; 

import homeImage from '/images/home-hero-bg-887bfdde.png';
import shopImage from '/images/shop-top.png';
import productImage from '/images/shop-top.png';
import contactImage from '/images/shop-top.png';
import logoImage from '/images/furniro.png'; 

function HeaderWithImage() {
  const location = useLocation();

  // Check if the current path is /login
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null; // Do not render anything for the login page
  }

  let headerImage, title, description, breadcrumb;

  switch (location.pathname) {
    case '/':
      headerImage = homeImage;
      break;
    case '/shop':
      headerImage = shopImage;
      title = "Shop";
      breadcrumb = (
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>Shop</span>
        </nav>
      );
      break;
      case '/wishlist':
        headerImage = productImage;
        title = "Wishlist";
        breadcrumb = (
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt; <span>Wishlist</span>
          </nav>
        );
        break;
    case '/cart':
      headerImage = productImage;
      title = "Cart";
      breadcrumb = (
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>Cart</span>
        </nav>
      );
      break;
    case '/contact':
      headerImage = contactImage;
      title = "Contact";
      breadcrumb = (
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>Contact</span>
        </nav>
      );
      break;
    default:
      headerImage = homeImage;
  }

  return (
  
 
      <div className="header-container">
        {(location.pathname === '/shop' || location.pathname === '/cart' || location.pathname === '/contact' || location.pathname === '/wishlist') && (
          <div className="logo-container">
            <img src={logoImage} alt="Page Logo" className="logo" /> {/* Logo above the header image */}
          </div>
        )}
        <Header image={headerImage} title={title} description={description} />
        {breadcrumb && <div className="breadcrumb-container">{breadcrumb}</div>} {/* Breadcrumb under the title */}
      </div>
    );
    

}

export default HeaderWithImage;
