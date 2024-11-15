import React from "react";

const GlassForm = (props) => {
  return (
    <section className="glass  ">
      {props.heading && (
        <h2 className="glass__heading glassform__heaing">{props.heading}</h2>
      )}

      <div className="glass__children ">{props.children}</div>
    </section>
  );
};

export default GlassForm;
