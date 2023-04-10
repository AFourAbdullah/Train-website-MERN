import React from "react";
import "./footer.css";
import logo from "../../assets/trainLogo.PNG";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer id="footer">
      <div>
        <img src={logo} alt="" className="logoImg" />
        <div className="icons">
          <img src="../../assets/icon-facebook.svg" alt="" />
          <img src="../../assets/icon-youtube.svg" alt="" />
          <img src="../../assets/icon-twitter.svg" alt="" />
          <img src="../../assets/icon-pinterest.svg" alt="" />
          <img src="../../assets/icon-instagram.svg" alt="" />
        </div>
      </div>

      <div id="footerLinks">
        <div>
          <Link to=""> About Us</Link>
          <Link to=""> Contact</Link>
          <Link to=""> Blog</Link>
        </div>
        <div>
          <Link to="">Careers</Link>
          <Link to=""> Support</Link>
          <Link to=""> Privacy Policy</Link>
        </div>
      </div>
      <div>
        <button className="btn">
          <Link to="/trains">Get Started</Link>
        </button>
        <p>© Trainistan. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
