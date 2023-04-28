import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ modalImg, onClose }) => {

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const clickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const { src, alt } = modalImg;

  return createPortal(
    <div className={s.overlay} onClick={clickBackdrop}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
