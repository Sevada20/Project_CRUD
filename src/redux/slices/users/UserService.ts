import axios from "axios";
import { ApiConfig } from "../../../service/ApiConfig";
import { IUser } from "./users.type";
export const getUsersList = async () => {
  const { data } = await axios.get<IUser[]>(ApiConfig.user);
  return data;
};
