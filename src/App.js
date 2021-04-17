import "./App.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./containers/dashboard/Dashboard";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import JobHome from "./containers/JobHome/JobHome";
import AddJob from "./containers/AddJob/AddJob";
import EditJob from "./containers/EditJob/EditJob";
import AppliedJob from "./containers/AppliedJob/AppliedJob";
import PostedJob from "./containers/PostedJob/PostedJob";
import Navbar from "./components/Navbar/Navbar";

axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        ) : (
          <>
            <Navbar />
            <Switch>
              <Route exact path="/">
                {/* <Home /> */}
                <Dashboard />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/company/addJob">
                <AddJob />
              </Route>
              <Route exact path="/job/:id">
                <JobHome />
              </Route>
              <Route exact path="/job/update/:idParam">
                <EditJob />
              </Route>
              <Route exact path="/user/applied/:userId">
                <AppliedJob />
              </Route>
              <Route exact path="/user/posted/:companyId">
                <PostedJob />
              </Route>
              {/* <Route exact path="/movie/:movieID">
                <MovieHome />
              </Route>
              <Route exact path="/search/:searchID">
                <Search />
              </Route>
              <Route exact path="/genre/:genreID/:genreName">
                <SearchGenre />
              </Route>
              <Route exact path="/user/:query">
                <Favourite />
              </Route> */}
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
