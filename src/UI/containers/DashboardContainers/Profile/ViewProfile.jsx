import React from "react";
import { CreditCard } from "../../../components";

const ViewProfile = (props) => {
  let name = null;
  if (props.account.first_name && props.account.last_name) {
    name = `${props.account.first_name} ${
      props.account.middle_name ? props.account.middle_name + " " : ""
    }${props.account.last_name}`;
  } else {
    name = "Update Your Name";
  }
  return (
    <div className="view-profile">
      <div className="view-profile__left view-profile__column">
        <table className="view-profile__table">
          <tbody className="view-profile__table__body">
            <tr className="view-profile__table__row">
              <td className="view-profile__table__data view-profile__table__data--heading">
                Name
              </td>
              <td className="view-profile__table__data view-profile__table__data--value">
                {name}
              </td>
            </tr>
            <tr className="view-profile__table__row">
              <td className="view-profile__table__data view-profile__table__data--heading">
                Email
              </td>
              <td className="view-profile__table__data view-profile__table__data--value">{`${props.account.email}`}</td>
            </tr>
            <tr className="view-profile__table__row">
              <td className="view-profile__table__data view-profile__table__data--heading">
                Phone
              </td>
              <td className="view-profile__table__data view-profile__table__data--value">
                {props.account.phone
                  ? `${props.account.phone}`
                  : "Update Your Contact"}
              </td>
            </tr>
            <tr className="view-profile__table__row">
              <td className="view-profile__table__data view-profile__table__data--heading">
                Joined
              </td>
              <td className="view-profile__table__data view-profile__table__data--value">{`${new Date(
                props.account.createdAt
              ).toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="view-profile__right view-profile__column">
        {/* {JSON.stringify(props.account)} */}
        <CreditCard data={props.account} />
      </div>
      <div className="view-profile__apps view-profile__column">
        <h2 className="view-profile__apps__heading">More Apps</h2>
        <div className="view-profile__apps__container">
          Coming Soon <br />
          Stay tuned for updates
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
