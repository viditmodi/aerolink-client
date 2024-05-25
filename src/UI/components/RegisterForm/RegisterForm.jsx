import React, { Fragment, useState } from "react";
import { BulbLabelTextBox } from "../../blocks";
import { Link, useNavigate } from "react-router-dom";
import REGEX from "../../../data/REGEX.constant";
import request from "../../../config/axios.config";
import { createNewAccount } from "../../../api/account.api";
// import { Loader } from "../";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    props.setIsLoading(true);
    e.preventDefault();
    try {
      console.log("respnse");
      const trimmedEmail = email.replace(REGEX.WHITESPACE, "");
      if (!REGEX.EMAIL.test(trimmedEmail)) {
        props.setIsLoading(false);
        return;
      }
      const data = { email: trimmedEmail };

      const res = await createNewAccount(data);
      // console.log(res);
      if (res.status) {
        if (redirect) {
          navigate(`/login?r=${redirect}`);
        } else {
          navigate(`/login`);
        }
      }
      props.setIsLoading(false);
    } catch (error) {
      // props.setIsLoading(false);
      console.log(error);
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
