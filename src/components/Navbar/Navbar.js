import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav>
      <ul class="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {user && user.role == "company" ? (
            <Link to={"/user/applied/" + user.id}>Posted</Link>
          ) : (
            <Link to={"/user/applied/" + user.id}>Applied</Link>
          )}
        </li>
        {/* <li>
          <Link to="#!">Contact</Link>
        </li>
        <li>
          <Link to="#!">Faq</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
