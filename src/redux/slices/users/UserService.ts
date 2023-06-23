import axios from "axios";
import { ApiConfig } from "../../../service/ApiConfig";
import { IUser, IUserForm } from "./users.type";
export const getUsersList = async () => {
  const { data } = await axios.get<IUser[]>(ApiConfig.user);
  return data;
};

export const createUser = async (data: IUserForm) => {
  const response = await axios.post<IUser>(ApiConfig.user, data);
  return response.data;
};
