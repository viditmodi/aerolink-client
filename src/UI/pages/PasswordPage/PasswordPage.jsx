import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlassForm } from "../../containers";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import localStore from "../../../config/localstorage.config";
import { useNavigate, useParams } from "react-router-dom";
import {
  changePasswordRequest,
  generateNewOTP,
  resetPasswordRequest,
  verifyOTPRequest,
} from "../../../api/account.api";
import { setPageTitle } from "../../../functions/document.functions";
import IdContext from "../../../context/IdContext/IdContext";

const PasswordPage = (props) => {
  const type = props.type;
  const { id } = useParams();

  const [heading, setHeading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOTP] = useState("");

  // checks
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  useEffect(() => {
    if (type === "change") {
      const accountData = localStore.getAccountData(id);
      setEmail(accountData.email);
      setHeading("Change Password");
      setPageTitle("Change Password | AeroLink");
    } else if (type === "reset") {
      setHeading("Reset Password");
      setPageTitle("Reset Password | AeroLink");
    }
  }, []);

  const generateOTP = async (e) => {
    e.preventDefault();
    const res = await generateNewOTP(email);
    console.log(res);
    if (res.status) {
      setHeading("Verify OTP");
      setOTPSent(true);
      setOTPVerified(false);
      setPasswordChanged(false);
      setPasswordReset(false);
    }
  };
  const verifyOTP = async (e) => {
    e.preventDefault();
    const res = await verifyOTPRequest(email, otp);
    console.log(res);
    if (res.status) {
      setOTPSent(false);
      setOTPVerified(true);
      setPasswordChanged(false);
      setPasswordReset(false);
      //   setHeading("Verified OTP");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const data = { password, confirm_password: confirmPassword };
    const res = await changePasswordRequest(email, data);
    console.log(res);
    if (res.status) {
      setOTPSent(false);
      setOTPVerified(false);
      setPasswordChanged(true);
      setPasswordReset(false);
      setHeading("Password Changed");
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    const res = await resetPasswordRequest(email);
    console.log(res);
    if (res.status) {
      setOTPSent(false);
      setOTPVerified(false);
      setPasswordChanged(false);
      setPasswordReset(true);
      setHeading("Password Reset");
    }
  };

  // if (type === "change" && !email) {
  //   const navigate = useNavigate();
  //   const ctx = useContext(IdContext);
  //   useEffect(() => {
  //     localStore.removeCurrentId();
  //     ctx.setCurrentId(-1);
  //     navigate("/switch");
  //   }, []);
  //   return (
  //     <div>
  //       <h1>Account Information Not Found</h1>
  //     </div>
  //   );
  // }
  return (
    <Fragment>
      <GlassForm heading={`${heading}`}>
        {!otpSent && !otpVerified && !passwordChanged && !passwordReset && (
          <form className="glassform__form" onSubmit={generateOTP}>
            <BulbLabelTextBox
              type={"email"}
              id={"email"}
              className={""}
              placeholder={"email"}
              value={email}
              regex={REGEX.EMAIL}
              setValue={setEmail}
            ></BulbLabelTextBox>

            <button
              type="submit"
              className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
            >
              Proceed
            </button>
          </form>
        )}

        {otpSent && !otpVerified && (
          <form className="glassform__form" onSubmit={verifyOTP}>
            <BulbLabelTextBox
              type={"text"}
              id={"otp"}
              className={""}
              placeholder={"OTP"}
              value={otp}
              //   regex={REGEX.EMAIL}
              setValue={setOTP}
            ></BulbLabelTextBox>

            <button
              type="submit"
              className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
            >
              Proceed
            </button>
          </form>
        )}

        {otpVerified && type === "reset" && (
          <form className="glassform__form" onSubmit={resetPassword}>
            <button
              type="submit"
              className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
            >
              Reset
            </button>
          </form>
        )}
        {otpVerified && type === "change" && (
          <form className="glassform__form" onSubmit={changePassword}>
            <BulbLabelTextBox
              type={"password"}
              id={"password"}
              className={""}
              placeholder={"new password"}
              value={password}
              //   regex={REGEX.EMAIL}
              setValue={setPassword}
            ></BulbLabelTextBox>
            <BulbLabelTextBox
              type={"password"}
              id={"confirm_password"}
              className={""}
              placeholder={"confirm new password"}
              value={confirmPassword}
              //   regex={REGEX.EMAIL}
              setValue={setConfirmPassword}
            ></BulbLabelTextBox>

            <button
              type="submit"
              className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
            >
              Change
            </button>
          </form>
        )}

        {passwordChanged && <p>Password Changed</p>}
        {passwordReset && <p>Password Reset</p>}
      </GlassForm>
    </Fragment>
  );
};

export default PasswordPage;
