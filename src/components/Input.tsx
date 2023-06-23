import React from "react";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  value: string;
  type: string;
  onChange: (e: string) => void;
};

function Input({ label, type, value, onChange }: InputProps) {
  return (
    <div className={styles.inputItemContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        placeholder="create your name"
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
export default Input;
