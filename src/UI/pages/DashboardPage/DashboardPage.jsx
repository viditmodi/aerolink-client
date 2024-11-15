import React, { Fragment, useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreditCard, Loader, UpdateForm } from "../../components";
import {
  ChangePassword,
  GlassForm,
  UpdateProfile,
  ViewProfile,
} from "../../containers";
import editIcon from "../../../assets/icons/edit.png";
import IdContext from "../../../context/IdContext/IdContext";
import { setPageTitle } from "../../../functions/document.functions";
import storage from "../../../helpers/storage.helper";

const DashboardPage = (props) => {
  // get sessionIndex from the url
  const { id } = useParams();
  const ctx = useContext(IdContext);
  // States
  const [account, setAccount] = useState(storage.getAccountByIndex(id));
  const [update, setUpdate] = useState(false);

  // Note: Handles any manual index change
  useEffect(() => {
    storage.saveSessionIndex(id);
    ctx.setCurrentId(id);
  }, []);

  useEffect(() => {
    const data = storage.getAccountByIndex(id);
    setAccount(data?.account);
  }, [update]);

  if (account) {
    setPageTitle(`Dashboard | ${account.email} | AeroLink`);
    // window.addEventListener("resize", () => {});
    return (
      <Fragment>
        <div className="dashboard wrapper scrolbar">
          <div className="dashboard__left dashboard__column">
            <div className="dashboard__profile">
              <div className="dashboard__profile__dp">
                <img
                  src={`https://api.multiavatar.com/${account?.email}.png`}
                  alt=""
                  className="dashboard__profile__dp__image"
                />
              </div>
              <div className="dashboard__profile__stats">
                <p className="dashboard__profile__stats__field dashboard__profile__stats__text">
                  Available Credits
                </p>
                <p className="dashboard__profile__stats__value dashboard__profile__stats__text">
                  {account.credit}
                </p>

                {/* <span>{account.credit}</span> */}
              </div>
            </div>

            <hr className="dashboard__hr" />

            <ul className="dashboard__navlist">
              <Link
                to={`/${id}/dashboard/profile`}
                className="dashboard__navlist__link"
              >
                <li className="dashboard__navlist__item">Profile</li>
              </Link>
              <Link
                to={`/${id}/dashboard/password/change`}
                className="dashboard__navlist__link"
              >
                <li className="dashboard__navlist__item">Change Password</li>
              </Link>
              <Link
                to={`/${id}/dashboard/profile/update`}
                className="dashboard__navlist__link"
              >
                <li className="dashboard__navlist__item">Update Profile</li>
              </Link>
            </ul>
          </div>

          <div className="dashboard__right dashboard__column">
            {props.view == "view-profile" && (
              <ViewProfile account={account}></ViewProfile>
            )}
            {props.view == "update-profile" && (
              <UpdateProfile account={account}></UpdateProfile>
              // <UpdateForm accountData={account}></UpdateForm>
            )}
            {props.view == "change-password" && (
              <ChangePassword></ChangePassword>
            )}
          </div>
          {/* <div className="dashboard__stats">
            {Object.keys(accountData).map((data) => {
              console.log(data);
              return (
                <p>
                  {data}: {accountData[data]}
                </p>
              );
            })}
          </div> */}
        </div>
      </Fragment>
    );
  } else {
    const navigate = useNavigate();
    useEffect(() => {
      storage.removeSessionIndex();
      ctx.setCurrentId(-1);
      navigate("/switch");
    }, []);
    return (
      <div>
        <h1>Account Information Not Found</h1>
      </div>
    );
  }
};

export default DashboardPage;
