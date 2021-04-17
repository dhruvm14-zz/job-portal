import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import moment from "moment";
import AuthContext from "../../context/AuthContext";

import "./JobHome.css";
import { Link } from "react-router-dom";

function JobHome() {
  const { id } = useParams();
  const [job, setjob] = useState({});
  const { user, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("/api/company/" + id);
      let jobData = data.data;
      const dataC = await axios.get("/api/users/searchId/" + jobData.companyId);

      let compData = dataC.data.user;
      let isApplied = await axios.get(
        "/api/userjob/isapplied/" + user.id + "&&" + jobData._id
      );
      let applications = await axios.get(
        "/api/userjob/applications/" + jobData._id
      );
      let userApplied = applications.data.savedJob;

      let users = await axios.get("/api/users/searchAll/", {
        userApplied: userApplied,
      });
      console.log(users);
      isApplied = isApplied.data;
      applications = applications.data.length;
      jobData = {
        ...jobData,
        companyInfo: compData,
        isApplied: isApplied,
        applications: applications,
        users: users,
      };
      setjob(jobData);
    };
    getData();
  }, [id]);
  console.log(job);
  const deleteHandler = async () => {
    try {
      await axios.post("/api/company/deljob/" + job._id);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addJobhandler = async () => {
    try {
      const newUserJob = {
        userId: user.id,
        jobId: job._id,
      };
      await axios.post("/api/userjob/addUserJob", newUserJob);
      let jobEdit = { ...job, isApplied: false };
      setjob(jobEdit);
    } catch (error) {
      alert(Object.values(error.response.data)[0]);
    }
  };
  console.log(id);
  return (
    <div className="JobHome">
      <div className="courses-container">
        <div className="jobHome">
          <div className="jobHome-preview">
            <h6>{job.typeofContract}</h6>
            <h2>{job.title}</h2>
            {job.companyInfo && (
              <Link
                to={{ pathname: "https://" + job.companyInfo.website }}
                target="_blank"
                className="comp_link"
              >
                {job.companyInfo.name}
              </Link>
            )}
          </div>
          <div className="jobHome-info">
            <div className="progress-container">
              {moment(job.date).fromNow()}
            </div>
            <h6>{job.location}</h6>
            <h4>JOB DESCRIPTION</h4>
            <p>{job.jobDesc}</p>
            <h4>Experience : </h4>
            <p>{job.experience}</p>
            <h4>Skills : </h4>
            <p>{job.skills}</p>
            <h4>Start Date : </h4>
            <p>{job.jobDate}</p>
            <h4>Salary : </h4>
            <p>Rs. {job.salary}/month</p>
            <h4>Applications :</h4>
            <p>{job.applications}</p>
            {console.log(user.role)}
            {user.role != "company" &&
              (!job.isApplied ? (
                <button className="JobHomebtn" onClick={addJobhandler}>
                  Apply
                </button>
              ) : (
                <button className="JobHomebtn" disabled>
                  Applied
                </button>
              ))}

            {job.companyInfo && user.id === job.companyInfo._id && (
              <Link
                to={"/job/update/" + job._id}
                className="JobHomebtn"
                style={{ backgroundColor: "#950740" }}
              >
                Edit
              </Link>
            )}
            {job.companyInfo && user.id === job.companyInfo._id && (
              <button
                className="JobHomebtn"
                style={{ backgroundColor: "#950740" }}
                onClick={deleteHandler}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      {job.users &&
        job.users.map((user, idx) => {
          <div id="login-container">
            <h1>Maddie</h1>
            <div class="description">
              Maddie is a front end web developer in New York. She has worked in
              the field for 10 years now. Check out her projects in the links
              below. She is available for hire as well.
            </div>
            <div class="social">
              <a>GitHub</a>
              <a>Twitter</a>
              <a>LinkedIn</a>
            </div>
            <button>Hire Me</button>
            <button>Hire Me</button>
          </div>;
        })}
    </div>
  );
}

export default JobHome;
