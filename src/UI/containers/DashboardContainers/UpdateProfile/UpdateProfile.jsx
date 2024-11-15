import React from "react";
import { UpdateForm } from "../../../components";

const UpdateProfile = (props) => {
  return (
    <div className="update-profile">
      <UpdateForm accountData={props.account}></UpdateForm>
    </div>
  );
};

export default UpdateProfile;
