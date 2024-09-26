
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import CartDropdown from "../../componants/CartDropdown/CartDropdown";
import logo from "/images/furniro.png";
import LogIn from "/icons/user-24fb1f8e.svg";
import Favorites from "/icons/heart-empty.svg";
import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const { cartTotalItems, wishlistTotalItems, wishlist } = useCartStore(
    (state) => ({
      wishlist: state.wishlist,
      cartTotalItems: state.cartTotalItems,
      wishlistTotalItems: state.wishlistTotalItems,
    })
  );
  const [activeLink, setActiveLink] = useState("/");

  const [wishlistCount, setWishlistCount] = useState(wishlistTotalItems());

  useEffect(() => {
    setWishlistCount(wishlistTotalItems());
  }, [wishlist]);

  const handleToggle = () => setIsNavOpen((prev) => !prev);
  
  // New function to handle link clicks
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsNavOpen(false); // Close the navbar on link click
  };

  const handleMouseEnter = () => setIsCartDropdownOpen(true);
  const handleMouseLeave = () => setIsCartDropdownOpen(false);

  return (
    <nav className="navbar">
      <div className="trendaro">
      <a href="/" className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>Trendora</span>
      </a>
      </div>
      <button className="nav-toggle" onClick={handleToggle}>
        ☰
      </button>
      <ul className={`nav-links ${isNavOpen ? "nav-active" : ""}`}>
        <div className="initial-links">
          <li className="home">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={activeLink === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li className="shop">
            <Link
              to="/shop"
              onClick={() => handleLinkClick("/shop")}
              className={activeLink === "/shop" ? "active" : ""}
            >
              Shop
            </Link>
          </li>
          <li className="about">
            <Link
              to="/about"
              onClick={() => handleLinkClick("/about")}
              className={activeLink === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li className="contact">
            <Link
              to="/contact"
              onClick={() => handleLinkClick("/contact")}
              className={activeLink === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
        </div>
      
        <li className="login">
          <Link to="/login" onClick={() => handleLinkClick("/login")}>
            <img src={LogIn} alt="Login" />
          </Link>
        </li>
        <li className="wishlist">
          <Link to="/wishlist" onClick={() => handleLinkClick("/wishlist")}>
            <img src={Favorites} alt="Wishlist" />
            {wishlistCount > 0 && (
              <span className="likes-count">{wishlistCount}</span>
            )}
          </Link>
        </li>
        <li
          className="cart"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/cart" onClick={() => handleLinkClick("/cart")}>
            🛒
            {cartTotalItems() > 0 && (
              <span className="cart-count">{cartTotalItems()}</span>
            )}
          </Link>
          {isCartDropdownOpen && (
            <CartDropdown onClose={() => setIsCartDropdownOpen(false)} />
          )}
        </li>
      </ul>

      {/* Sidebar */}
      <div className={`sidebar ${isNavOpen ? "sidebar-active" : ""}`}>
        <button className="close-btn" onClick={() => setIsNavOpen(false)}>
          ✖
        </button>
        <a href="/" className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>Trendora</span>
      </a>
        <ul className="sidebar-links">
          <li>
            <Link to="/" onClick={() => handleLinkClick("/")}>Home</Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => handleLinkClick("/shop")}>Shop</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => handleLinkClick("/about")}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => handleLinkClick("/contact")}>Contact</Link>
          </li>
          
          <li className="login">
            <Link to="/login" onClick={() => handleLinkClick("/login")}>
              <img src={LogIn} alt="Login" />
            </Link>
          </li>

          <li className="wishlist">
            <Link to="/wishlist" onClick={() => handleLinkClick("/wishlist")}>
              <img src={Favorites} alt="Wishlist" />
              {wishlistCount > 0 && (
                <span className="likes-count">{wishlistCount}</span>
              )}
            </Link>
          </li>
          <li
            className="cart"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/cart" onClick={() => handleLinkClick("/cart")}>
              🛒
              {cartTotalItems() > 0 && (
                <span className="cart-count">{cartTotalItems()}</span>
              )}
            </Link>
            {isCartDropdownOpen && (
              <CartDropdown onClose={() => setIsCartDropdownOpen(false)} />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
