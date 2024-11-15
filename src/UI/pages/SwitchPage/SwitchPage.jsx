import React, { Fragment, useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { Link, useNavigate } from "react-router-dom";
import HttpRequest from "../../../api/account.api";
// import { Loader } from "../../components";
import { setPageTitle } from "../../../functions/document.functions";
import storage from "../../../helpers/storage.helper";
import { Popup } from "../../../functions";

const SwitchPage = () => {
  const ctx = useContext(IdContext);
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState(storage.getAllAccounts());
  useEffect(() => {
    setAccountArray(storage.getAllAccounts());
    setPageTitle("Switch Account | AeroLink");
    // console.log(?)
  }, []);

  const handleSwitchAccount = (index) => {
    ctx.setCurrentId(index);
    if (redirect) {
      window.location.replace(redirect);
    } else {
      navigate(`/${index}/dashboard`);
    }
  };

  const deleteAccount = async (id) => {
    ctx.setIsLoading(true);
    try {
      const confirmation = await Popup.confirm(
        "Do you want to delete the account? (This action is permanent)"
      );
      if (!confirmation) {
        ctx.setIsLoading(false);
        return;
      }
      const res = await HttpRequest.deleteAccount(id);
      await Popup.alert("Account deleted successfully");
      ctx.setIsLoading(false);
    } catch (error) {
      await Popup.alert(error.message);
      ctx.setIsLoading(false);
    }
  };
  return (
    <Fragment>
      {/* {isLoading && <Loader></Loader>} */}
      <div className="switch">
        <h2 className="switch__heading">Switch Accounts</h2>
        <div className="switch__accounts">
          {accountArray.map((element, index) => {
            return (
              <div className="switch__account">
                <p
                  className="switch__account__text"
                  onClick={() => {
                    handleSwitchAccount(index);
                  }}
                >
                  {element.account.email}
                </p>
                <div className="switch__account__btns">
                  <button
                    className="switch__account__btn switch__account__btn--delete btn"
                    onClick={() => {
                      deleteAccount(index);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="switch__btns">
          <Link to={"/login"} className="switch__btn btn">
            Add Account
          </Link>
          <Link to={"/register"} className="switch__btn btn">
            Create New Account
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default SwitchPage;
