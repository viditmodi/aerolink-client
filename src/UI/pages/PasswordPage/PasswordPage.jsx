import React, { Fragment, useContext, useEffect, useState } from "react";
import { GlassForm } from "../../containers";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import localStore from "../../../config/localstorage.config";
import { useNavigate, useParams } from "react-router-dom";
import HttpRequest from "../../../api/account.api";
import { setPageTitle } from "../../../functions/document.functions";
import IdContext from "../../../context/IdContext/IdContext";
import storage from "../../../helpers/storage.helper";
import { Popup } from "../../../functions";

const PasswordPage = (props) => {
  const type = props.type;
  const ctx = useContext(IdContext);
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
      const accountData = storage.getAccountByIndex(id);
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
    try {
      const res = await HttpRequest.generateOTP(email);
      console.log(res);
      // if (res.status) {
      setHeading("Verify OTP");
      setOTPSent(true);
      setOTPVerified(false);
      setPasswordChanged(false);
      setPasswordReset(false);
      // }
    } catch (error) {
      await Popup.alert(error.message);
    }
  };
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await HttpRequest.verifyOTP(email, otp);
      console.log(res);
      if (res.status) {
        setOTPSent(false);
        setOTPVerified(true);
        setPasswordChanged(false);
        setPasswordReset(false);
        //   setHeading("Verified OTP");
      }
    } catch (error) {
      await Popup.alert(error.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const data = { password, confirm_password: confirmPassword };
      const confirmation = await Popup.confirm(
        "Do you want to change the password?"
      );
      if (!confirmation) {
        return;
      }
      const res = await HttpRequest.changePassword(email, data);
      console.log(res);
      if (res.status) {
        setOTPSent(false);
        setOTPVerified(false);
        setPasswordChanged(true);
        setPasswordReset(false);
        setHeading("Password Changed");
      }
    } catch (error) {
      await Popup.alert(error.message);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const confirmation = await Popup.confirm(
        "Do you want to reset the password?"
      );
      if (!confirmation) {
        return;
      }
      const res = await HttpRequest.resetPassword(email);
      console.log(res);
      if (res.status) {
        setOTPSent(false);
        setOTPVerified(false);
        setPasswordChanged(false);
        setPasswordReset(true);
        setHeading("Password Reset");
      }
    } catch (error) {
      await Popup.alert(error.message);
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
