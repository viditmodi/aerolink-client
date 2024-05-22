import React, { useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { Link, useNavigate } from "react-router-dom";

const SwitchPage = () => {
  const ctx = useContext(IdContext);
  const navigate = useNavigate();
  const [accountArray, setAccountArray] = useState(
    localStore.getAllAccountsData()
  );
  useEffect(() => {
    setAccountArray(localStore.getAllAccountsData());
  }, []);

  const handleSwitchAccount = (index) => {
    ctx.setCurrentId(index);
    navigate(`/${index}/dashboard`);
  };
  return (
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
                <button className="switch__account__btn switch__account__btn--delete btn">
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
  );
};

export default SwitchPage;
