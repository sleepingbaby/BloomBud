import React from "react";

function Footer() {
  return (
    <footer className="navbar">
      <div className="container-fluid">
        <a href="/" className="nav-link text-light">
          Copyright &copy; {new Date().getFullYear()} BloomBud
        </a>
      </div>
    </footer>
  );
}

export default Footer;
