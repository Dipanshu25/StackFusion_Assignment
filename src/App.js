import { useState } from "react";
import "./App.css";

import { addUser } from "./request.js";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useHistory } from "react-router-dom";
import AppRoutes from "./AppRoutes.js";

function App() {
  const initialValues = { username: "", dob: "", email: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataResponse, setdataResponse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const form = useRef();
  const history = useHistory();
  const handleRoute = (e) => {
    console.log("jai mata di 1");
    history.push(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormErrors({ ...formErrors, phone: "" });
    }
    if (name === "dob") {
      setFormErrors({ ...formErrors, dob: "" });
    }
    if (name === "username") {
      setFormErrors({ ...formErrors, username: "" });
    }
    if (name === "email") {
      setFormErrors({ ...formErrors, email: "" });
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const push = async () => {
    let response = await addUser(formValues);
    console.log(response);
    if (response) {
      setdataResponse("Submitted");
      setFormValues({ username: "", dob: "", email: "", phone: "" });

      handleRoute("/list");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lr5px4b",
        "template_c14mpy5",
        form.current,
        "MMk_RM8nsnTSFSyy2"
      )
      .then(
        (result) => {
          console.log("sent");
        },
        (error) => {
          console.log("Failed");
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = validate(formValues);
    if (Object.keys(res).length === 0) {
      sendEmail(e);
      push();

      console.log("no error");
      setIsSubmit(true);
      setIsLoggedIn(true);
    }
    setFormErrors(res);
  };

  const validate = (values) => {
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    var d = new Date();
    var year = d.getFullYear();

    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "username must be more than 4 characters";
    } else if (values.username.length > 10) {
      errors.username = "username cannot exceed more than 15 characters";
    }
    if (isNaN(Date.parse(values.dob))) {
      errors.dob = "Please enter the age";
    } else {
      if (Math.abs(parseInt(values.dob.substring(0, 4)) - year) <= 18)
        errors.dob = "Age Must be greater than 18 years old";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.phone) {
      errors.phone = "phone number is required";
    }

    return errors;
  };

  return (
    <div>
      {isLoggedIn ? (
        <AppRoutes></AppRoutes>
      ) : (
        <div className="mainWrapper">
          <div className="mainWrapper-Image"></div>
          <div className="mainWrapper-container">
            <div className="container">
              {dataResponse.length > 0 && isSubmit ? (
                <div className="ui message success">{dataResponse}</div>
              ) : (
                <pre></pre>
              )}

              <form ref={form} onSubmit={handleSubmit}>
                <div className="main-title-wrapper">
                  <div className="left-title">
                    <h1>Welcome</h1>
                  </div>
                  <div className="right-title">
                    <h1>Sign up today!</h1>
                  </div>
                </div>
                <div className="ui divider"></div>
                <div className="ui form">
                  <div className="field">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.username}</p>
                  <div className="field">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={formValues.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.dob}</p>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.email}</p>
                  <div className="field">
                    <label>Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.phone}</p>

                  <button className="fluid ui button blue">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
