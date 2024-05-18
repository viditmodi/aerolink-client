import React, { Fragment, useState } from "react";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import { updateExistingAccount } from "../../../api/account.api";
import { formatName, objectifyName } from "../../../functions/name.functions";

const UpdateForm = (props) => {
  const [name, setName] = useState(formatName(props.accountData) || "");
  //   const [userId, setUserId] = useState("")
  //   const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(props.accountData.phone || "");

  //
  const updateUser = async (e) => {
    props.setIsLoading(true);
    e.preventDefault();
    try {
      console.log("respnse");
      console.log(name);
      const formattedName = objectifyName(name);
      console.log(formattedName);

      const data = {
        ...props.accountData,
        ...formattedName,
        phone,
      };

      const res = await updateExistingAccount(data);
      console.log(res);
      if (res.status) {
        // navigate("/login");
        props.setUpdate(false);
      }
      props.setIsLoading(false);
    } catch (error) {
      // props.setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Fragment>
      <form className="glassform__form" onSubmit={updateUser}>
        <BulbLabelTextBox
          type={"text"}
          id={"name"}
          className={""}
          placeholder={"name"}
          value={name}
          //   regex={REGEX.EMAIL}
          setValue={setName}
        ></BulbLabelTextBox>
        <BulbLabelTextBox
          type={"number"}
          id={"phone"}
          className={""}
          placeholder={"phone"}
          value={phone}
          //   regex={REGEX.EMAIL}
          setValue={setPhone}
        ></BulbLabelTextBox>

        <button
          type="submit"
          className="glassform__btn btn shadow3d-btn shadow3d-btn--focus"
        >
          Update
        </button>
      </form>
    </Fragment>
  );
};

export default UpdateForm;
