import React from "react";
import styles from "./Modal.module.css";

interface IPropsModal {
  title: string;
  children: JSX.Element;
  onClose: () => void;
}

const Modal: React.FC<IPropsModal> = ({ title, children, onClose }) => {
  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};
export default Modal;
