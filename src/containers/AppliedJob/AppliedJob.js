import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory,useParams } from "react-router-dom";
import Job from "../../components/Job/Job";
import AuthContext from "../../context/AuthContext";

function AppliedJob() {
    const { userId } = useParams();
    const [jobs, setjob] = useState([]);
    const { user, getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
          let applications = await axios.get(
            "/api/userjob/users/applications/" + userId
          );
         applications = applications.data
         applications.forEach((element,index,object) => {
             if(element===null){
                 object.splice(index, 1);
             }
         });
          console.log(applications)
          setjob(applications);
          console.log(jobs)
        };
        getData();
    }, [userId])

    if(user&&user.role==="company") return <Redirect to={"/user/posted/"+user.id} />;
    return (
      <div className="AppliedJob">
      {console.log(jobs)}
       {jobs && jobs.map((job, index) => <Job job={job} key={index} />)}
      </div>
    );
}

export default AppliedJob
