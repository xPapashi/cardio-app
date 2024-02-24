import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <ul>
          <CustomLink to="/" className="home">Home</CustomLink>
          <CustomLink to="/RecipeGenerator" className="recipeGen">Recipe Generator</CustomLink>
          <CustomLink to="/Account" className="account">Account</CustomLink>
        </ul>
      </nav>
    </>
  );
}

function CustomLink({to, children, className, ...props}) {
  return (
    <li>
      <Link to={to} className={className} {...props}>{children}</Link>
    </li>
  )
}