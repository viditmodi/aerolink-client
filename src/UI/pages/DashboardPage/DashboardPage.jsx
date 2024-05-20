import React, { Fragment, useContext, useEffect, useState } from "react";
import localStore from "../../../config/localstorage.config";
import { useNavigate, useParams } from "react-router-dom";
import { CreditCard, Loader, UpdateForm } from "../../components";
import { GlassForm } from "../../containers";
import editIcon from "../../../assets/icons/edit.png";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import IdContext from "../../../context/IdContext/IdContext";

const DashboardPage = () => {
  const { id } = useParams();
  const ctx = useContext(IdContext);
  const [accountData, setAccountData] = useState(localStore.getAccountData(id));
  const [isLoading, setIsLoading] = useState(false);

  const [update, setUpdate] = useState(false);
  useEffect(() => {
    ctx.setCurrentId(id);
  }, []);
  useEffect(() => {
    const data = localStore.getAccountData(id);
    setAccountData(data);
  }, [update]);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (accountData) {
    return (
      <Fragment>
        <div className="dashboard wrapper scrollbar">
          <div className="dashboard__card">
            <div className="dashboard__creditcard">
              <CreditCard data={accountData} />
              <button
                className="dashboard__creditcard__btn btn"
                onClick={() => {
                  setUpdate(true);
                }}
              >
                <img src={editIcon} alt="" />
              </button>
            </div>
            <div className="dashboard__card__stats">
              <p className="dashboard__card__text">Available Credits</p>
              <span>{accountData.credit}</span>
            </div>
          </div>
          <div className="dashboard__stats">
            {Object.keys(accountData).map((data) => {
              return (
                <p>
                  {data}: {accountData[data]}
                </p>
              );
            })}
          </div>
          <div className="dashboard__apps">
            sit amet consectetur adipisicing elit. Ab expedita cupiditate optio
            harum velit adipisci dolores magni, laboriosam sed repudiandae
            accusamus, eligendi est ipsum quaerat quos animi hic. Tempora porro,
            expedita deserunt earum, voluptatibus voluptate sapiente labore
            atque ducimus praesentium dolor excepturi molestias animi, fugit qui
            ipsa odio deleniti tenetur laudantium repellendus rem alias quas!
            Necessitatibus aspernatur laborum in quis cumque ut
          </div>
        </div>
        {update && (
          <div className="dashboard__update">
            <GlassForm heading={"Update Form"}>
              <UpdateForm
                setIsLoading={setIsLoading}
                setUpdate={setUpdate}
                accountData={accountData}
              ></UpdateForm>
            </GlassForm>
          </div>
        )}
      </Fragment>
    );
  } else {
    const navigate = useNavigate();
    useEffect(() => {
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
