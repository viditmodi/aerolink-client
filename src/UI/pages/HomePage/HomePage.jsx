import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlassForm } from "../../containers";
import { Loader, LoginForm, RegisterForm } from "../../components";
import localStore from "../../../config/localstorage.config";

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const numLoggedInAccounts = localStore.doesAccountExist();
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (props.page === "home") {
    return (
      <div className="homepage">
        <h1 className="homepage__title title">AeroLink</h1>
        <h3 className="homepage__tagline">One stop link to innovation</h3>
        <div className="homepage__btns">
          <Link to={"/login"}>
            <button className="btn homepage__btn shadow3d-btn shadow3d-btn--focus">
              {numLoggedInAccounts === 0 ? "Login" : "Add Account"}
            </button>
          </Link>
          <Link to={"/register"}>
            <button className=" btn homepage__btn shadow3d-btn shadow3d-btn--dull">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (props.page === "login") {
    return (
      <GlassForm
        heading={numLoggedInAccounts == 0 ? "Login" : "Add Another Account"}
      >
        <LoginForm setIsLoading={setIsLoading}></LoginForm>
      </GlassForm>
    );
  } else if (props.page === "register") {
    return (
      <GlassForm
        heading={numLoggedInAccounts === 0 ? "Register" : "Create New Account"}
      >
        <RegisterForm setIsLoading={setIsLoading}></RegisterForm>
      </GlassForm>
    );
  }
};

export default HomePage;
