import React from "react";
import Input from "../../components/Input";
import styles from "./UserForm.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createUserAction,
  resetCreateUserStatus,
  updateUserAction,
} from "../../redux/slices/users/UserSlice";
import { RootState } from "../../app/store";
import {
  ApiStatus,
  IUserForm,
  updateUserData,
} from "../../redux/slices/users/users.type";
import { useParams } from "react-router-dom";
import { toastError } from "../../components/ToastifyConfig";

type UserFormProps = {
  isEditForm?: boolean;
};

const UserForm = ({ isEditForm }: UserFormProps) => {
  const list = useAppSelector((state: RootState) => state.users.list);
  const params = useParams();
  const { createUserFormStatus, updateUserFormStatus } = useAppSelector(
    (state: RootState) => state.users
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
    const data: IUserForm = {
      name: nameInput,
      email: emailInput,
    };
    if (emailInput && nameInput) {
      if (isEditForm && params.id) {
        const dirtyFormData: updateUserData = {
          id: Number(params.id),
          data,
        };
        // @ts-ignore
        dispatch(updateUserAction(dirtyFormData));
      } else dispatch(createUserAction({ name: nameInput, email: emailInput }));
    } else {
      toastError("Fill the form");
    }
  };

  React.useEffect(() => {
    const userData = list.find((user) => String(user.id) === params.id);
    if (userData) {
      setNameInput(userData.name);
      setEmailInput(userData.email);
    }
  }, [params.id, list]);

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
          <input
            type="submit"
            value={isEditForm ? "Update" : "Create"}
            disabled={
              createUserFormStatus === ApiStatus.loading ||
              updateUserFormStatus === ApiStatus.loading
            }
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
