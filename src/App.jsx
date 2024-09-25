

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './layouts/footer/Footer';
import Navbar from './layouts/navbar/Navbar';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';

import SingleProduct from './pages/SingleProduct';
import HeaderWithImage from './componants/HeaderWithImage'; 

import Quality from './layouts/Quality/Quality';
import ScrollToTopButton from './componants/ScrollToTopButton';
import { ToastContainer } from 'react-toastify';

import PlaceOrder from './pages/PlaceOrder';


import SignUp from './auth/signup/SignUp';

import WishList from './pages/WishList';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import About from './pages/About';
import LogIn from './auth/login/LogIn';



// import About from './pages/about';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <HeaderWithImage /> {/* Use the HeaderWithImage component here */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id/:name" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/checkout" element={<Checkout />} /> 
     
        <Route path="/placeorder" element={<PlaceOrder />} />

       
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Quality /> {/* Header placed above the Footer */}
      <Footer />
      {/* Scroll-to-Top Button */}
      <ScrollToTopButton />
    </Router>
 
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
      />
    </>
  );
}

export default App;

