import React from "react";

const GlassForm = (props) => {
  return (
    <section className="glassform">
      <h2 className="glassform__heading">{props.heading}</h2>
      {props.children}
    </section>
  );
};

export default GlassForm;
