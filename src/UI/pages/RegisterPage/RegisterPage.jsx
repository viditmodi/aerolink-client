import React, { useEffect } from "react";
import { RegisterForm } from "../../components";
import { GlassForm } from "../../containers";
import { setPageTitle } from "../../../functions/document.functions";
import storage from "../../../helpers/storage.helper";

const RegisterPage = () => {
  let message =
    storage.getNumberOfAccounts() > 0 ? "Create Another Account" : "Register";
  useEffect(() => {
    setPageTitle(`${message} | AeroLink`);
  }, []);
  return (
    <>
      {/* <h2>Register</h2> */}
      <GlassForm heading={message}>
        <RegisterForm></RegisterForm>
      </GlassForm>
    </>
  );
};

export default RegisterPage;
