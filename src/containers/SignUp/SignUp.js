import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./SignUp.css";
import { useHistory, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function SignUp(props) {
  const [right, setright] = useState(false);
  const [errors, seterrors] = useState({});
  const { user, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleToggle = () => {
    setright(!right);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [qualification, setQualification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        website: website,
        qualification: qualification,
      };
      await axios.post("/api/users/register", newUser);
      await getLoggedIn();
      history.push("/");
    } catch (error) {
      alert(Object.values(error.response.data)[0]);
      console.log(error.response.data);
    }
  };

  const handleCSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        website: website,
      };
      await axios.post("/api/users/company/register", newUser);
      await getLoggedIn();
      history.push("/");
    } catch (error) {
      alert(Object.values(error.response.data)[0]);
      console.log(error.response.data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="SignUp">
      <div
        className={`signup-container ${right ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="login-form" onSubmit={handleCSubmit}>
            <h1>Sign Up</h1>
            <span>As COMPANY</span>
            <input
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
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

            <button className="login-button">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Sign Up</h1>

            <span>As INDIVIDUAL</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
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
