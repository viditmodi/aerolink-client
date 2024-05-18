import React from "react";

const BulbLabelTextBox = (props) => {
  const handleOnChange = (e) => {
    const bulb = document.getElementById(props.id + "_bulb");
    props.setValue(e.target.value);
    if (e.target.value === "") {
      bulb.classList.remove("bl-textbox__bulb--success");
      bulb.classList.remove("bl-textbox__bulb--failure");
      bulb.classList.remove("bl-textbox__bulb--neutral");
      return;
    }
    if (!props.regex) {
      bulb.classList.remove("bl-textbox__bulb--success");
      bulb.classList.remove("bl-textbox__bulb--failure");
      bulb.classList.add("bl-textbox__bulb--neutral");
    } else {
      if (props.regex.test(e.target.value)) {
        bulb.classList.remove("bl-textbox__bulb--neutral");
        bulb.classList.remove("bl-textbox__bulb--failure");
        bulb.classList.add("bl-textbox__bulb--success");
      } else {
        bulb.classList.remove("bl-textbox__bulb--success");
        bulb.classList.remove("bl-textbox__bulb--neutral");
        bulb.classList.add("bl-textbox__bulb--failure");
      }
    }
  };
  return (
    <div className="bl-textbox">
      <input
        type={props.type}
        name={props.id}
        id={props.id}
        className={`bl-textbox__input`}
        value={props.value}
        onChange={handleOnChange}
        placeholder={props.placeholder}
      />
      <label htmlFor={props.id} className="bl-textbox__label">
        {props.placeholder}
      </label>
      <span className="bl-textbox__bulb" id={props.id + "_bulb"}></span>
      <p className="bl-textbox__error"></p>
    </div>
  );
};

export default BulbLabelTextBox;
