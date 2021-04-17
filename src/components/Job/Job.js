import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Job.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Job({ job }) {
  console.log(moment(job.date).fromNow());
  const [company, setCompany] = useState({ name: "" });
  useEffect(() => {
    const getComp = async () => {
      const data = await axios.get("/api/users/searchId/" + job.companyId);
      setCompany(data.data.user);
    };
    getComp();
  }, []);

  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-preview">
          <h6>{job.typeofContract}</h6>
          <h2>{job.title}</h2>
          <a href="#" className="companyName">{company.name}</a>
        </div>
        <div className="course-info">
          <div className="progress-container">{moment(job.date).fromNow()}</div>
          <h6>{job.location}</h6>
          <h4>Experience : {job.experience}</h4>
          <h4>Skills : {job.skills}</h4>
          <h4>Start Date : {job.jobDate}</h4>
          <Link to = {"/job/"+job._id}>
            <button className="Jobdbtn">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Job;
