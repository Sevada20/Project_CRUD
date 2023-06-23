import React from "react";
import Input from "../../components/Input";
import styles from "./UserForm.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createUserAction,
  resetCreateUserStatus,
} from "../../redux/slices/users/UserSlice";
import { RootState } from "../../app/store";
import { ApiStatus } from "../../redux/slices/users/users.type";
const UserForm = () => {
  const createUserFormStatus = useAppSelector(
    (state: RootState) => state.users.createUserFormStatus
  );
  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = React.useState<string>("");
  const [emailInput, setEmailInput] = React.useState<string>("");

  const handleClickNameInput = (e: string) => {
    setNameInput(e);
  };
  const handleClickEmailInput = (e: string) => {
    setEmailInput(e);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUserAction({ name: nameInput, email: emailInput }));
  };

  React.useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setNameInput("");
      setEmailInput("");
      dispatch(resetCreateUserStatus());
    }
  }, [createUserFormStatus, dispatch]);
  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
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
    </div>
  );
};

export default UserForm;
