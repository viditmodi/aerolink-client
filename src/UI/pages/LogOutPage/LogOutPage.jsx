import React, { Fragment, useEffect, useState } from "react";
import { Loader, Timer } from "../../components";
import { logoutFromSingleAccount } from "../../../api/account.api";

const LogOutPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (props.type === "one") {
      //   alert("one");
      logoutFromSingleAccount()
        .then((res) => {
          setIsCounting(true);
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
            console.log("object");
          }}
        ></Timer>
      )}
    </Fragment>
  );
};

export default LogOutPage;
