

import './Footer.css';
import { Link } from "react-router-dom"; 

function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const helpLinks = [
    { name: "Payment Options", url: "#" },
    { name: "Returns", url: "#" },
    { name: "Privacy Policies", url: "#" },
  ];

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2>Funiro.</h2>
            <address>
              400 University Drive Suite 200 Coral <br /> Gables, <br />
              FL 33134 USA
            </address>
          </div>
          <div className="footer-column">
            <h3>Links</h3>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              {helpLinks.map((help, index) => (
                <li key={index}>
                  <a href={help.url}>{help.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Newsletter</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the form from submitting and reloading the page
                // Add your subscription logic here
              }}
            >
              <input type="email" placeholder="Enter Your Email Address" />
              <button  type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2023 Funiro. All rights reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
