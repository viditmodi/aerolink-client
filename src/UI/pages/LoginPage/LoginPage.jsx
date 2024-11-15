import React, { useContext, useEffect, useState } from "react";
import { setPageTitle } from "../../../functions/document.functions";
import { GlassForm } from "../../containers";
import { LoginForm } from "../../components";
import IdContext from "../../../context/IdContext/IdContext";
import storage from "../../../helpers/storage.helper";

const LoginPage = () => {
  let message = storage.getNumberOfAccounts() > 0 ? "Add Account" : "Login";
  useEffect(() => {
    setPageTitle(`${message} | AeroLink`);
  }, []);
  return (
    <GlassForm heading={message}>
      <LoginForm></LoginForm>
    </GlassForm>
  );
};

export default LoginPage;
