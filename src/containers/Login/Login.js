import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [right, setright] = useState(false);
  const handleToggle = () => {
    setright(!right);
  };

  return (
    <div className="Login">
      <div
        className={`login-container ${right ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#" className="login-form">
            <h1>Sign In</h1>
            <span>COMPANY</span>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="login-button">Sign In</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="login-form">
            <h1>Sign In</h1>

            <span>INDIVIDUAL</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

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
