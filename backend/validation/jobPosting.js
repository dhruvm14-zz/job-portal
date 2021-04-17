const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateJobInput(data) {
  let errors = {};
  
  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.experience = !isEmpty(data.experience) ? data.experience : "";
  data.typeofContract = !isEmpty(data.typeofContract)
    ? data.typeofContract
    : "";
  data.qualifications = !isEmpty(data.qualifications)
    ? data.qualifications
    : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

  data.jobDate = !isEmpty(data.jobDate) ? data.jobDate : "";

  // Name checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }
  if (Validator.isEmpty(data.experience)) {
    errors.experience = "Experience field is required";
  }
  if (Validator.isEmpty(data.typeofContract)) {
    errors.typeofContract = "Type of Contract field is required";
  }
  if (Validator.isEmpty(data.qualifications)) {
    errors.qualifications = "Qualifications field is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }

  if (Validator.isEmpty(data.jobDate)) {
    errors.jobDate = "Job Date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
