import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="rodape">
      <p id="dev">
        Desenvolvido com <i className="fa fa-heart" aria-hidden="true"></i> por
        mateus eloi bastos
      </p>
      <p id="icons">
        <a
          className="social-media"
          href="https://github.com/eluire"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        <a
          className="social-media"
          href="https://www.linkedin.com/in/mateus-bastos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-linkedin-square" aria-hidden="true"></i>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
