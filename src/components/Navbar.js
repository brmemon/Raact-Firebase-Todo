
import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar_navbar">
      <div className="main_navbar">
        <Link to="/" className="navbar-logo">Task Keeper</Link>
        <ul id='navbar' className="navbar-ul">
          <li><Link to="/login">login</Link></li>
          <li><Link to="/signup">Components</Link></li>
          <li><button className="btn red">logout</button></li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar