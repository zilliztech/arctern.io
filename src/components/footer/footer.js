import React from "react";
import PropTypes from "prop-types";
import "./footer.scss";

const Footer = ({ locale, style }) => {
  return (
    <footer className="footer-wrapper" style={style}>
      <div className="copy-right">
        <span>
          © 2019 - {new Date().getFullYear()} Arctern. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  language: PropTypes.object,
  locale: PropTypes.string.isRequired
};

export default Footer;
