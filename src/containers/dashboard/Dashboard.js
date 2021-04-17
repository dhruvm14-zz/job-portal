import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import Job from "../../components/Job/Job";
import AuthContext from "../../context/AuthContext";

function Dashboard() {
  const { user, getLoggedIn } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  console.log(user);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("/api/company/");
      const job = data.data;
      const nowDate = new Date(job[0].date).toISOString();
      console.log(nowDate);

      job.sort(function (a, b) {
        a.date = new Date(a.date);
        b.date = new Date(b.date);
        return b.date - a.date;
      });
      setJobs(job);

      console.log(job);
    };
    getData();
  }, []);

  const onLogoutClick = async (e) => {
    e.preventDefault();
    await axios.get("/api/users/logout");
    await getLoggedIn();
    history.push("/");
    history.go(0);
  };

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
        {jobs && jobs.map((job, index) => <Job job={job} key={index} />)}
      </div>
    </div>
  );
}

export default Dashboard;
