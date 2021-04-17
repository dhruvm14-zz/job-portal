import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import Job from "../../components/Job/Job";
import AuthContext from "../../context/AuthContext";

function PostedJob() {
  const { userId } = useParams();
  const [jobs, setjob] = useState([]);
  const { user, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      let applications = await axios.get("/api/company/posted/" + user.id);
      applications = applications.data;

      console.log(applications);
      setjob(applications);
      console.log(jobs);
    };
    getData();
  }, [userId]);

  if (user && user.role === "individual") return <Redirect to="/" />;

  return (
    <div className="PostedJob">
      {jobs && jobs.map((job, index) => <Job job={job} key={index} />)}
    </div>
  );
}

export default PostedJob;
