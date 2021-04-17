import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";

function Login(props) {
  const [right, setright] = useState(false);
  const [errors, seterrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, getLoggedIn } = useContext(AuthContext);

  const handleToggle = () => {
    setright(!right);
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
      };
      console.log(newUser);
      const data = await axios.post("/api/users/login", {
        email,
        password,
      });

      console.log(data);
      await getLoggedIn();
      history.push("/");
    } catch (error) {
      alert(Object.values(error.response.data)[0]);
      console.log(error.response.data);
    }
  };

  return (
    <div className="Login">
      <div
        className={`login-container ${right ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>COMPANY</span>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button">Sign In</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Sign In</h1>

            <span>INDIVIDUAL</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Login as INDIVIDUAL?</h1>
              <p>Looking for JOBS? Login and Start Applying</p>
              <button
                className="ghost login-button"
                id="signIn"
                onClick={handleToggle}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Login As COMPANY?</h1>
              <p>Login and Post/Manage Jobs</p>
              <button
                className="ghost login-button"
                id="signUp"
                onClick={handleToggle}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
