import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header({ loggedIn, setLoggedIn }) {
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:3001/users/logout", {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      if (response.ok) {
        setLoggedIn(false);
        window.location.replace("/");
      } else {
        console.error("Something went wrong please try again");
      }
    } catch (err) {
      console.error({ message: err });
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            BloomBud
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                </a>
              </li>
              {loggedIn ? (
                <Fragment>
                  <li className="nav-item">
                    <a className="nav-link" href="/plants">
                      <FontAwesomeIcon icon={faLeaf} /> My Plants
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faUser} /> Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    <FontAwesomeIcon icon={faUser} /> Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
