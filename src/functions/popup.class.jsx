import { Alert, Confirm } from "../UI/components";
import ReactDOM from "react-dom/client";

class Popup {
  static alert = (message, onCloseCallback = () => {}) => {
    return new Promise((resolve) => {
      const modalRoot = document.getElementById("popup");
      // modalRoot.id = "popup";
      // document.body.appendChild(modalRoot);

      const handleClose = () => {
        onCloseCallback();
        root.unmount(); // Unmount the component with createRoot's unmount method
        // document.body.removeChild(modalRoot); // Remove the div from the DOM
        resolve();
      };

      // Use createRoot instead of render
      const root = ReactDOM.createRoot(modalRoot);
      root.render(<Alert message={message} onClose={handleClose} />);
    });
  };

  static confirm = (message) => {
    return new Promise((resolve) => {
      const modalRoot = document.getElementById("popup");

      const handleOk = () => {
        root.unmount(); // Unmount the component with createRoot's unmount method
        resolve(true);
      };
      const handleCancel = () => {
        root.unmount(); // Unmount the component with createRoot's unmount method
        resolve(false);
      };

      // Use createRoot instead of render
      const root = ReactDOM.createRoot(modalRoot);
      root.render(
        <Confirm
          message={message}
          onConfirm={handleOk}
          onCancel={handleCancel}
        />
      );
    });
  };

  // static confirm = () => {};
}

export default Popup;
