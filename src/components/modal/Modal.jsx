import React from "react";
import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = ({ children, handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className="Modal">
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
