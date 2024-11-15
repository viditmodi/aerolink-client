import React, { useEffect } from "react";

const Confirm = ({ message, onConfirm, onCancel }) => {
  // Cleanup effect for removing the element
  useEffect(() => {
    return () => {
      // Optional: any additional cleanup can go here
    };
  }, []);

  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__text">
          <p className="popup__heading">AeroLink wants your confirmation:</p>
          <p className="popup__message">{message}</p>
        </div>

        <div className="popup__btn-group">
          <button
            className={"popup__btn popup__btn--dull btn"}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={"popup__btn popup__btn--focus btn"}
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
