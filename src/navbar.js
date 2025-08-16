import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4" >
      <Link className="navbar-brand fw-bold" to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr5mqizeLBJN7YMEV6cicR2b2PFGRlAghsQw&s"
          alt="Logo"
          width="80"
          className="me-2"
        />
        BigBoss Men's Wear
      </Link>

      <div className="ms-auto d-none d-lg-block">
        <span
          style={{
            backgroundColor: '#f3d1eb',
            color: '#1e1e1e',
            fontWeight: 500,
            borderRadius: '999px',
            padding: '0.3rem 0.75rem',
            fontSize: '0.85rem',
          }}
        >
          Now get your fashion in your city Mathura
        </span>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Wishlist">Wishlist</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/About">About</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-primary ms-3" to="/Orders">Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
