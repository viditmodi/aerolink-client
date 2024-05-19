import React, { useState } from "react";
import IdContext from "./IdContext";

const IdState = (props) => {
  const [currentId, setCurrentId] = useState(-1);

  const exportObject = { currentId, setCurrentId };
  return (
    <IdContext.Provider value={exportObject}>
      {props.children}
    </IdContext.Provider>
  );
};

export default IdState;
