import React, { useState, useContext } from "react";
import "./AddJob.css";
import AuthContext from "../../context/AuthContext";
import { useHistory, Redirect } from "react-router-dom";

import axios from "axios";

function AddJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [typeofContract, settypeofContract] = useState("Full Time");
  const [jobDesc, setjobDesc] = useState("");
  const [qualifications, setqualifications] = useState("");
  const [experience, setexperience] = useState("");
  const [skills, setskills] = useState("");
  const [salary, setsalary] = useState("");
  const [jobDate, setjobDate] = useState("");
  const [mobile, setmobile] = useState("");
  const history = useHistory();

  const { user } = useContext(AuthContext);
  console.log(user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        title: title,
        location: location,
        typeofContract: typeofContract,
        jobDesc: jobDesc,
        qualifications: qualifications,
        experience: experience,
        skills: skills,
        salary: salary,
        jobDate: jobDate,
        mobile: mobile,
        companyId: user.id,
      };

      await axios.post("http://127.0.0.1:5000/api/company/addJob", newJob);
      history.push("/");
    } catch (error) {
      alert(Object.values(error.response.data)[0]);
    }
  };

  if (user && user.role === "individual") {
    return <Redirect to="/" />;
  }

  return (
    <div className="AddJob">
      <form className="jobForm" onSubmit={onSubmitHandler}>
        <h1>ADD JOB</h1>
        <legend>
          <span class="number">1</span> BASIC INFO
        </legend>

        <label for="title" className="jobLabel">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          class="jobInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label for="location" className="jobLabel">
          Location :
        </label>
        <input
          type="text"
          id="location"
          name="location"
          class="jobInput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label for="typeofContract" className="jobLabel">
          Job Type :
        </label>
        <select
          id="typeofContract"
          name="typeofContract"
          value={typeofContract}
          onChange={(e) => settypeofContract(e.target.value)}
        >
          <option value="Full Time">Full Time</option>
          <option value="Internship">Internship</option>
          <option value="Part Time">Part Time</option>
          <option value="Volunteering">Volunteering</option>
        </select>

        <legend>
          <span class="number">2</span> JOB DESCRIPTION
        </legend>

        <label for="jobDesc" className="jobLabel">
          Description:
        </label>
        <textarea
          id="jobDesc"
          name="jobDesc"
          class="jobInput"
          value={jobDesc}
          onChange={(e) => setjobDesc(e.target.value)}
        ></textarea>

        <label for="qualifications" className="jobLabel">
          Qualifications :
        </label>
        <input
          type="text"
          id="qualifications"
          name="qualifications"
          class="jobInput"
          value={qualifications}
          onChange={(e) => setqualifications(e.target.value)}
        />

        <label for="experience" className="jobLabel">
          Experience :
        </label>
        <input
          type="text"
          id="experience"
          name="experience"
          class="jobInput"
          value={experience}
          onChange={(e) => setexperience(e.target.value)}
        />

        <label for="skills" className="jobLabel">
          Skills :
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          class="jobInput"
          value={skills}
          onChange={(e) => setskills(e.target.value)}
        />

        <legend>
          <span class="number">3</span> OTHERS
        </legend>

        <label for="salary" className="jobLabel">
          Salary :
        </label>
        <input
          type="text"
          id="salary"
          name="salary"
          class="jobInput"
          value={salary}
          onChange={(e) => setsalary(e.target.value)}
        />

        <label for="jobDate" className="jobLabel">
          Start Date :
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          class="jobInput"
          value={jobDate}
          onChange={(e) => setjobDate(e.target.value)}
        />

        <label for="mobile" className="jobLabel">
          Contact :
        </label>
        <input
          type="text"
          id="location"
          name="location"
          class="jobInput"
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
        />
        <button type="submit" class="jobButton">
         POST JOB
        </button>
      </form>
    </div>
  );
}

export default AddJob;
