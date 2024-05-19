import React, { useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import IdContext from "../../../context/IdContext/IdContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      {accountArray.map((account, index) => {
        return (
          <div
            onClick={() => {
              handleSwitchAccount(index);
            }}
          >
            {account.email}
          </div>
        );
      })}
    </div>
  );
};

export default SwitchPage;
