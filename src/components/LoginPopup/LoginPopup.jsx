import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import basicRouter from "../../serverRouter";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerResponse, setRegisterResponse] = useState({});
  const [loginResponse, setLoginResponse] = useState({});
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      password,
    };
    try {
      const response = await axios.post(`${basicRouter}/register`, payload);
      setRegisterResponse(response.data);
      console.log(`the data is `, response.data);
      console.log(`the registered response is here`, registerResponse);
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (error) {
      console.log(`error while using the axios`);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    try {
      const loginUser = await axios.post(`${basicRouter}/login`, payload);
      setLoginResponse(loginUser.data);
      console.log(`login response is here`, loginUser);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(`error while loggin in the user!!`);
    }
  };
  return (
    <div className="login-popup">
      <form
        onSubmit={
          currState === "Sing Up" ? handleRegisterSubmit : handleLoginSubmit
        }
        className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={(e) => setFullName(e.target.value)}
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
            />
          )}
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email id"
            required
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
          />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms and Conditions.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sing Up")}>Click here!</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
