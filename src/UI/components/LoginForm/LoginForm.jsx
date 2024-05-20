import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import { logInToAccount } from "../../../api/account.api";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";

const LoginForm = (props) => {
  const ctx = useContext(IdContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    props.setIsLoading(true);
    e.preventDefault();
    try {
      const trimmedEmail = email.replace(REGEX.WHITESPACE, "");

      const data = { email: trimmedEmail, password: password };
      const index = await logInToAccount(data);
      console.log(index);
      if (index >= 0) {
        ctx.setCurrentId(index);
        localStore.saveCurrentId(index);
        navigate(`/${index}/dashboard`);
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
        New to AeroLink?{" "}
        <Link to={"/register"} className="glassform__link">
          Register Now
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
