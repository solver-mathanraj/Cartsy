import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Logo & About */}
          <div className="col-md-3 mb-4">
            <h3 className="fw-bold">CARTSY</h3>
            <p>
              Your one-stop shop for fashion, electronics, lifestyle, and more!
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-3 mb-4">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-light text-decoration-none">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 mb-4">
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/faq" className="text-light text-decoration-none">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/returns" className="text-light text-decoration-none">
                  Returns
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-light text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="col-md-3 mb-4">
            <h5>Stay Connected</h5>
            <p>Subscribe to our newsletter</p>
            <form className="d-flex mb-3">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Your email"
              />
              <button className="btn btn-outline-light">Subscribe</button>
            </form>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <FaFacebookF />
              </a>
              <a href="#" className="text-light">
                <FaInstagram />
              </a>
              <a href="#" className="text-light">
                <FaTwitter />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />
        <div className="text-center">
          <small>
            &copy; {new Date().getFullYear()} CARTSY. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
