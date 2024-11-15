import React, { useEffect } from "react";

const Alert = ({ message, onClose }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClose();
    }
  };
  document.addEventListener("keydown", handleKeyPress);

  // Cleanup effect for removing the element
  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // Optional: any additional cleanup can go here
    };
  }, []);

  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__text">
          <p className="popup__heading">AeroLink wants your attention:</p>
          <p className="popup__message">{message}</p>
        </div>
        <div className="popup__btn-group">
          <button
            className={"popup__btn popup__btn--focus btn"}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
