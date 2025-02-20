"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../../../assets/styles/Global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="nav-brand">KANKUN 4.0</div>
      <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca de</Link>
        <Link to="/features">Características</Link>
        <Link to="/encuestas">Encuestas</Link> 
        <div className="nav-buttons">
          <Link to="/login" className="btn-login">Iniciar Sesión</Link>
          <Link to="/register" className="btn-register">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
