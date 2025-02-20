"use client";
import React from "react";
import "./Footer.css";
import "../../../assets/styles/Global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>KANKUN 4.0</h3>
          <p>Tu compañero de viaje personalizado</p>
          <div className="footer-contact">
            <a href="mailto:info@kankun.com">info@kankun.com</a>
            <a href="tel:+52123456789">+52 123 456 789</a>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <a href="#privacy">Privacidad</a>
          <a href="#terms">Términos</a>
          <a href="#contact">Contacto</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 KANKUN 4.0. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

