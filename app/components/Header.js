"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Carousel
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" ariaCurrent="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" ariaDisabled="true">
                  Disabled
                </a>
              </li>
            </ul>

            {!user ? (
              <Link href="/login" class="btn btn-primary" role="button">
                Login
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => logout()}
                className="btn btn-primary"
              >
                Logout({user.username})
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
