import React, { Fragment, useContext, useState } from "react";
import { BulbLabelTextBox } from "../../blocks";
import { Link, useNavigate } from "react-router-dom";
import REGEX from "../../../data/REGEX.constant";
// Remove: import request from "../../../config/axios.config";
import HttpRequest from "../../../api/account.api";
import IdContext from "../../../context/IdContext/IdContext";
import { Popup } from "../../../functions";
// Remove: import { Loader } from "../";

//
const RegisterForm = () => {
  const ctx = useContext(IdContext);
  const [email, setEmail] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const navigate = useNavigate();

  // The Function to Handle the Registeration Form Submit
  const registerUser = async (e) => {
    ctx.setIsLoading(true);
    e.preventDefault();
    try {
      console.log("Registering User");

      // the method that handles the registration request
      // Note: if the response contains status code 4xx or 5xx an error will be thrown and handled in the catch block
      // Dropped: add first_name, middle_name, last_name, phone in the form
      const res = await HttpRequest.createAccount({ email });

      // checks if the the page has to redirected
      const confirmation = await Popup.confirm(
        res.message + ". Redirect to Login?"
      );
      if (confirmation) {
        // if (redirect) {
        //   navigate(`/login?r=${redirect}`);
        // } else {
        navigate(`/login`);
        // }
      }
      ctx.setIsLoading(false);
    } catch (error) {
      console.log(error);
      // handling the error message
      await Popup.alert(error.message, () => {});
      ctx.setIsLoading(false);
    }
  };
  return (
    <Fragment>
      {/* {showPopUp} */}
      {/* <hr className="glassform__hr" /> */}
      <form className="glass__form" onSubmit={registerUser}>
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
          className="glass__btn btn shadow3d-btn shadow3d-btn--focus"
        >
          Register
        </button>
      </form>
      <hr className="glassform__hr" />
      <p className="glass__text">
        Already have account?{" "}
        <Link to={"/login"} className="glass__link">
          Login Here
        </Link>
      </p>
    </Fragment>
  );
};

export default RegisterForm;
