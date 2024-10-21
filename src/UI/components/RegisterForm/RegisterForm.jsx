import React, { Fragment, useState } from "react";
import { BulbLabelTextBox } from "../../blocks";
import { Link, useNavigate } from "react-router-dom";
import REGEX from "../../../data/REGEX.constant";
// Remove: import request from "../../../config/axios.config";
import HttpRequest from "../../../api/account.api";
// Remove: import { Loader } from "../";

//
const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const navigate = useNavigate();

  // The Function to Handle the Registeration Form Submit
  const registerUser = async (e) => {
    props.setIsLoading(true);
    e.preventDefault();
    try {
      console.log("Registering User");

      // the method that handles the registration request
      // Note: if the response contains status code 4xx or 5xx an error will be thrown and handled in the catch block
      // TODO: add first_name, middle_name, last_name, phone in the form
      const res = await HttpRequest.createAccount({ email });

      // checks if the the page has to redirected
      // TODO: show success message
      if (redirect) {
        navigate(`/login?r=${redirect}`);
      } else {
        navigate(`/login`);
      }
      props.setIsLoading(false);
    } catch (error) {
      console.log(error);
      // handling the error message
      // TODO: Create an Alert Component
      alert(error.message);
      props.setIsLoading(false);
    }
  };
  return (
    <Fragment>
      <form className="glassform__form" onSubmit={registerUser}>
        <BulbLabelTextBox
          type={"email"}
          id={"email"}
          className={""}
          placeholder={"email"}
          value={email}
          regex={REGEX.EMAIL}
          setValue={setEmail}
        ></BulbLabelTextBox>
        <button
          type="submit"
          className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
        >
          Register
        </button>
      </form>
      <p className="glassform__text">
        Already have account?{" "}
        <Link to={"/login"} className="glassform__link">
          Login Here
        </Link>
      </p>
    </Fragment>
  );
};

export default RegisterForm;
