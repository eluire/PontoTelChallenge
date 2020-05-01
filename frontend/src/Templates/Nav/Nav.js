import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar center navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bovespa">
              Consulta Bovespa
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/consulta">
              Consulta Empresas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/consulta_personalizada">
              Consulta Personalizada
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
