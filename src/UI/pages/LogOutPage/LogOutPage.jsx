import React, { Fragment, useContext, useEffect, useState } from "react";
import { Loader, Timer } from "../../components";
import { logoutFromSingleAccount } from "../../../api/account.api";
import localStore from "../../../config/localstorage.config";
import { useNavigate, useParams } from "react-router-dom";
import IdContext from "../../../context/IdContext/IdContext";

const LogOutPage = (props) => {
  const ctx = useContext(IdContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const { id } = useParams();
  const [accountData, setAccountData] = useState(localStore.getAccountData(id));
  useEffect(() => {
    const data = localStore.getAccountData(id);
    setAccountData(data);
  }, []);
  if (accountData) {
    useEffect(() => {
      setIsLoading(true);
      if (props.type === "one") {
        //   alert("one");
        logoutFromSingleAccount(id)
          .then((res) => {
            setIsCounting(true);
            ctx.setCurrentId(-1);
          })
          .catch((error) => console.log(error));
      } else if (props.type === "all") {
        //   alert("all");
      }
      setIsLoading(false);
    }, [props.type]);

    return (
      <Fragment>
        {isLoading && <Loader></Loader>}
        <div>Loggin out</div>
        {isCounting && (
          <Timer
            function={() => {
              navigate("/switch");
            }}
          ></Timer>
        )}
      </Fragment>
    );
  } else {
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

export default LogOutPage;
