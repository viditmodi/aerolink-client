import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlassForm } from "../../containers";
import { Loader, LoginForm, RegisterForm } from "../../components";
// import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { setPageTitle } from "../../../functions/document.functions";
import storage from "../../../helpers/storage.helper";

const HomePage = (props) => {
  // const ctx = useContext(IdContext);
  // const [isLoading, setIsLoading] = useState(false);
  const numLoggedInAccounts = storage.getNumberOfAccounts();
  // const currentId = ctx.currentId;

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
            {numLoggedInAccounts > 0 ? "Add Account" : "Login"}
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
};

export default HomePage;
