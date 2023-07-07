export type IUser = {
  id: number;
  name: string;
  email: string;
};

export enum ApiStatus {
  "loading",
  "ideal",
  "success",
  "error",
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface IUserState {
  list: User[];
  listStatus: ApiStatus;
  createUserFormStatus: ApiStatus;
  updateUserFormStatus: ApiStatus;
}

export interface IUserForm {
  name: string;
  email: string;
}
export type updateUserData = {
  id: number;
  data: IUserForm;
};
