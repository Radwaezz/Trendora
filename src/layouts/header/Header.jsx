

import './Header.css';

function Header({ image, title, description }) {
  return (
    <div className="header">
      <img src={image} alt="" className="header-image" />
      {title && (
        <div className="header-text">
          <h1>{title}</h1>
          {description && <p>{description}</p>} 
        </div>
      )}
    </div>
  );
}

export default Header;

