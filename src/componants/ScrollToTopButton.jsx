import ScrollToTop from 'react-scroll-to-top';
import logo from '../../public/images/furniro.png'; 

const ScrollToTopButton = () => {
  return (
    <ScrollToTop
      smooth
      top={20} // Adjust the distance from the top if needed
      style={{
        backgroundColor: 'white', 
        borderRadius: '50%',
        width: '50px', // Reduced width
        height: '50px', // Reduced height
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        bottom: '20px', 
        right: '20px', 
        position: 'fixed',
        border: '2px solid #b88e2f', // Adjusted the border size
      }}
      component={
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'white', 
          border: '2px solid #b88e2f', // Adjusted border thickness
          backgroundImage: `url(${logo})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      }
    />
  );
};

export default ScrollToTopButton;
