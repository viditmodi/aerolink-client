import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import HttpRequest from "../../../api/account.api";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";

const LoginForm = (props) => {
  const ctx = useContext(IdContext);
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login Form Submit Handler
  const loginUser = async (e) => {
    props.setIsLoading(true);
    e.preventDefault();

    try {
      console.log("Logging in");
      // Request Handler

      const { newLogin, index } = await HttpRequest.logIntoAccount({
        query: email,
        password: password,
      });
      console.log("Login Index: " + index);

      //TODO: Confirm if he wishes to be redirected
      //TODO: Else stay on the same page and allow another login
      if (newLogin) {
        alert("Logged in successfully. Do you want to visit dashboard?");
      } else {
        alert("Already Logged in. Do you want to visit dashboard?");
      }

      if (index >= 0) {
        ctx.setCurrentId(index);
        localStore.saveCurrentId(index);

        if (redirect) {
          window.location.replace(redirect);
        } else {
          navigate(`/${index}/dashboard`);
        }
        // navigate(`/${index}/dashboard`);
      }

      props.setIsLoading(false);
    } catch (error) {}
  };
  return (
    <Fragment>
      <form className="glassform__form" onSubmit={loginUser}>
        <BulbLabelTextBox
          type={"email"}
          id={"email"}
          className={""}
          placeholder={"email"}
          value={email}
          regex={REGEX.EMAIL}
          setValue={setEmail}
        ></BulbLabelTextBox>
        <BulbLabelTextBox
          type={"password"}
          id={"password"}
          className={""}
          placeholder={"password"}
          value={password}
          regex={REGEX.PASSWORD}
          setValue={setPassword}
        ></BulbLabelTextBox>
        <button
          type="submit"
          className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
        >
          Login
        </button>
      </form>
      <p className="glassform__text">
        <Link to={"/password/reset"} className="glassform__link">
          Forgot Password
        </Link>
      </p>
      <p className="glassform__text">
        New to AeroLink?{" "}
        <Link to={"/register"} className="glassform__link">
          Register Now
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
