import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <p className="loader__title">Loading</p>
      <div className="loader__view"></div>
      <p className="loader__text">Loading...</p>
    </div>
  );
};

export default Loader;
