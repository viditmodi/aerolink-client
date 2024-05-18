import React from "react";
import aerolinkLogo from "../../../assets/logos/AeroLink.png";
import { formatName } from "../../../functions/name.functions";
const CreditCard = (props) => {
  return (
    <div className="creditcard">
      {/* {Object.keys(props.data).map((data) => {
        return (
          <p>
            {data}: {props.data[data]}
          </p>
        );
      })} */}

      <div className="creditcard__top">
        <div className="creditcard__webname">
          <div className="creditcard__logo">
            <img
              src={aerolinkLogo}
              alt=""
              className="creditcard__logo__image"
            />
          </div>
          <h2 className="creditcard__title title">AeroLink</h2>
        </div>
      </div>

      <div className="creditcard__bottom">
        <div className="creditcard__cardnumber creditcard__text">
          {`${props.data.user_id.slice(0, 4)} ${props.data.user_id.slice(
            4,
            8
          )} ${props.data.user_id.slice(8, 12)} ${props.data.user_id.slice(
            12,
            16
          )}`}
        </div>
        <div className="creditcard__dates creditcard__text">
          <p className="creditcard__date">
            <strong>Joined:</strong>{" "}
            <span>
              {new Date(props.data.createdAt).toDateString().slice(4)}
            </span>
          </p>
          <p className="creditcard__date">
            <strong>Last Seen:</strong>{" "}
            <span>
              {new Date(props.data.updatedAt).toDateString().slice(4)}
            </span>
          </p>
        </div>
        <div className="creditcard__name creditcard__text">
          <p>{formatName(props.data)}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
