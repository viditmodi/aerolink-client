import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlassForm } from "../../containers";
import { Loader, LoginForm, RegisterForm } from "../../components";
// import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { setPageTitle } from "../../../functions/document.functions";

const HomePage = (props) => {
  const ctx = useContext(IdContext);
  const [isLoading, setIsLoading] = useState(false);
  // const numLoggedInAccounts = localStore.doesAccountExist();
  const currentId = ctx.currentId;
  if (isLoading) {
    return <Loader></Loader>;
  } else if (props.page === "home") {
    setPageTitle("Home | AeroLink");
    return (
      <div className="homepage">
        <h1 className="homepage__title title">AeroLink</h1>
        <h3 className="homepage__tagline">
          Seamless Access, Infinite Possibilities
        </h3>
        <div className="homepage__btns">
          <Link to={"/login"}>
            <button className="btn homepage__btn shadow3d-btn shadow3d-btn--focus">
              {currentId < 0 ? "Login" : "Add Account"}
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
    setPageTitle(
      `${currentId < 0 ? "Login" : "Add Another Account"} | AeroLink`
    );
    return (
      <GlassForm heading={currentId < 0 ? "Login" : "Add Another Account"}>
        <LoginForm setIsLoading={setIsLoading}></LoginForm>
      </GlassForm>
    );
  } else if (props.page === "register") {
    setPageTitle(
      `${currentId < 0 ? "Register" : "Create New Account"} | AeroLink`
    );
    return (
      <GlassForm heading={currentId < 0 ? "Register" : "Create New Account"}>
        <RegisterForm setIsLoading={setIsLoading}></RegisterForm>
      </GlassForm>
    );
  }
};

export default HomePage;
