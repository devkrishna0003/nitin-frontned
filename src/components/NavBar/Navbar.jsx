import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import basicRouter from "../../serverRouter";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [user, setUser] = useState({});
  const handleGettingUser = async () => {
    try {
      const user = await axios.post(`${basicRouter}/get-user`);
      setUser(user.data);
      console.log(`the logged in user is `, user);
    } catch (error) {
      console.log(`error while getting the user!!`);
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}>
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}>
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile App")}
          className={menu === "Mobile App" ? "active" : ""}>
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}>
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
        <button onClick={handleGettingUser}>{user.fullName || "value"}</button>
      </div>
    </div>
  );
};

export default Navbar;
