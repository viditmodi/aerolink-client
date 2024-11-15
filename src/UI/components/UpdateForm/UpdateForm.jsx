import React, { Fragment, useContext, useEffect, useState } from "react";
import { BulbLabelTextBox } from "../../blocks";
import REGEX from "../../../data/REGEX.constant";
import HttpRequest from "../../../api/account.api";
import { formatName, objectifyName } from "../../../functions/name.functions";
import IdContext from "../../../context/IdContext/IdContext";
import { Popup } from "../../../functions";
import storage from "../../../helpers/storage.helper";
import { useNavigate } from "react-router-dom";

const UpdateForm = (props) => {
  const ctx = useContext(IdContext);
  const navigate = useNavigate();
  const [name, setName] = useState(formatName(props.accountData) || "");
  //   const [userId, setUserId] = useState("")
  //   const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(props.accountData.phone || "");

  useEffect(() => {
    setName(formatName(props.accountData));
    setPhone(props.accountData.phone);
  }, []);

  const updateUser = async (e) => {
    ctx.setIsLoading(true);
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

      const res = await HttpRequest.updateAccount(data);
      console.log(res);
      await Popup.alert(res.message, () => {});
      if (res.status) {
        const index = storage.getLoginIndexByEmail(res.data.email);
        navigate(`/${index}/dashboard/profile`);
        // props.setUpdate(false);
      }
      ctx.setIsLoading(false);
    } catch (error) {
      // console.log(error);
      await Popup.alert(error.message);
      ctx.setIsLoading(false);
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
