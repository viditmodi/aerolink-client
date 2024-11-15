import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import HttpRequest from "../../../api/account.api";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import storage from "../../../helpers/storage.helper";
import { Popup } from "../../../functions";

const LoginForm = (props) => {
  // Local States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook Variables
  const ctx = useContext(IdContext);
  const navigate = useNavigate();

  // Other Variables
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");

  // Handler: Login Form Submit Handler
  const loginUser = async (e) => {
    ctx.setIsLoading(true);
    e.preventDefault();

    try {
      console.log("Logging in");
      // Request Handler

      const { newLogin, index, length } = await HttpRequest.logIntoAccount({
        query: email,
        password: password,
      });
      console.log("Login Index: " + index);

      let message = null;
      if (newLogin) {
        message = "Logged in successfully. Do you want to visit dashboard?";
      } else {
        message = "Already Logged in. Do you want to visit dashboard?";
      }
      const confirmarion = await Popup.confirm(message);
      if (confirmarion) {
        // if (index >= 0) {
        ctx.setCurrentId(index);
        storage.saveSessionIndex(index);
        // localStore.saveCurrentId(index);
        if (redirect) {
          window.location.replace(redirect);
        } else {
          navigate(`/${index}/dashboard`);
        }
        // }
      }

      ctx.setIsLoading(false);
    } catch (error) {
      await Popup.alert(error.message);
      ctx.setIsLoading(false);
    }
  };

  // Component
  return (
    <Fragment>
      <form className="glass__form" onSubmit={loginUser}>
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
          className="glass__btn btn shadow3d-btn shadow3d-btn--focus"
        >
          Login
        </button>
      </form>
      <p className="glass__text">
        <Link to={"/password/reset"} className="glass__link">
          Forgot Password
        </Link>
      </p>
      <p className="glass__text">
        New to AeroLink?{" "}
        <Link to={"/register"} className="glass__link">
          Register Now
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
