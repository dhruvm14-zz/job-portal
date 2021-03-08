import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [right, setright] = useState(false);
  const handleToggle = () => {
    setright(!right);
  };
  return (
    <div className="SignUp">
      <div
        className={`signup-container ${right ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#" className="login-form">
            <h1>Sign Up</h1>
            <span>As COMPANY</span>
            <input type="name" placeholder="Name" />
            <input type="text" placeholder="Website" />
            <input type="text" placeholder="Mobile" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="login-button">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="login-form">
            <h1>Sign Up</h1>

            <span>As INDIVIDUAL</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Mobile" />
            <input type="text" placeholder="Qualification" />
            <label for="CV">UPLOAD CV:</label>
            <input type="file" placeholder="CV" id="CV" name="CV" />

            <button className="login-button">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Sign Up as INDIVIDUAL?</h1>
              <p>Looking for JOBS? Signup and Start Applying</p>
              <button
                className="ghost login-button"
                id="signIn"
                onClick={handleToggle}
              >
                Sign Up
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Sign Up As COMPANY?</h1>
              <p>SignUp to EXPLORE the seamlessness of JOB Posting !</p>
              <button
                className="ghost login-button"
                id="signUp"
                onClick={handleToggle}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
