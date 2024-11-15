import React, { useState } from "react";
import IdContext from "./IdContext";

const IdState = (props) => {
  const [currentId, setCurrentId] = useState(-1);
  const [numberOfAccounts, setNumberOfAccounts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const exportObject = {
    currentId,
    setCurrentId,
    isLoading,
    setIsLoading,
    numberOfAccounts,
    setNumberOfAccounts,
  };
  return (
    <IdContext.Provider value={exportObject}>
      {props.children}
    </IdContext.Provider>
  );
};

export default IdState;
