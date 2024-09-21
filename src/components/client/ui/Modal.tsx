import React from "react";

interface Imodal {
  type: string;
  message: string;
  closeModal: () => void;
}

const Modal = ({ type, message, closeModal }: Imodal) => {
  console.log("clicked");
  return (
    <div className="modal-overlay">
      <div className={`modal ${type}`}>
        <div className="modal-header">
          <h2>{type}!</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
