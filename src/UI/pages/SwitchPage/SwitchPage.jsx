import React, { Fragment, useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccountRequest } from "../../../api/account.api";
import { Loader } from "../../components";

const SwitchPage = () => {
  const ctx = useContext(IdContext);
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("r");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState(
    localStore.getAllAccountsData()
  );
  useEffect(() => {
    setAccountArray(localStore.getAllAccountsData());
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
    setIsLoading(true);
    const res = await deleteAccountRequest(id);
    if (res.status) {
      alert("Account Deleted");
    }
    setIsLoading(false);
  };
  return (
    <Fragment>
      {isLoading && <Loader></Loader>}
      <div className="switch">
        <h2 className="switch__heading">Switch Accounts</h2>
        <div className="switch__accounts">
          {accountArray.map((account, index) => {
            return (
              <div className="switch__account">
                <p
                  className="switch__account__text"
                  onClick={() => {
                    handleSwitchAccount(index);
                  }}
                >
                  {account.email}
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
