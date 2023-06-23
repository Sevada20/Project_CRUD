import React from "react";
import Input from "../../components/Input";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const [nameInput, setNameInput] = React.useState<string>("");
  const [emailInput, setEmailInput] = React.useState<string>("");

  const handleClickNameInput = (e: string) => {
    setNameInput(e);
  };
  const handleClickEmailInput = (e: string) => {
    setEmailInput(e);
  };

  return (
    <form className={styles.container}>
      <Input
        label="Name"
        type="text"
        value={nameInput}
        onChange={handleClickNameInput}
      />
      <Input
        label="Email"
        type="email"
        value={emailInput}
        onChange={handleClickEmailInput}
      />
      <div className={styles.buttonAddUser}>
        <input type="submit" value="Add user" />
      </div>
    </form>
  );
};

export default UserForm;
