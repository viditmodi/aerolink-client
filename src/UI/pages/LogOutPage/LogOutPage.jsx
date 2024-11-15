import React, { Fragment, useContext, useEffect, useState } from "react";
import { Loader, Timer } from "../../components";
import HttpRequest from "../../../api/account.api";
// import localStore from "../../../config/localstorage.config";
import { Link, useNavigate, useParams } from "react-router-dom";
import IdContext from "../../../context/IdContext/IdContext";
import { setPageTitle } from "../../../functions/document.functions";
import storage from "../../../helpers/storage.helper";
import { Popup } from "../../../functions";

const LogOutPage = (props) => {
  const ctx = useContext(IdContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const { id } = useParams();
  const [accountData, setAccountData] = useState(storage.getAccountByIndex(id));
  useEffect(() => {
    const data = storage.getAccountByIndex(id);
    setAccountData(data);
  }, []);
  if (accountData) {
    setPageTitle("Logging out " + accountData?.email + " | AeroLink");
    useEffect(() => {
      ctx.setIsLoading(true);
      if (props.type === "one") {
        setText("Logging out from current account");
        HttpRequest.logoutFromSingleAccount(id)
          .then((res) => {
            ctx.setCurrentId(-1);
            storage.removeSessionIndex();
            setIsCounting(true);
            ctx.setIsLoading(false);
          })
          .catch(async (error) => {
            console.log(error);
            await Popup.alert(error.message);
            ctx.setIsLoading(false);
          });
      } else if (props.type === "all") {
        //   alert("all");
      }
    }, []);

    return (
      <Fragment>
        {/* {isLoading && <Loader></Loader>} */}
        <p className="logout__text">{text}</p>
        {isCounting && (
          <Timer
            function={() => {
              navigate("/switch");
            }}
          ></Timer>
        )}
        <Link
          to={"/switch"}
          className="btn shadow3d-btn shadow3d-btn--dull logout__btn"
        >
          Choose another account
        </Link>
      </Fragment>
    );
  } else {
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

export default LogOutPage;
