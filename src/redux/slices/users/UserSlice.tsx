import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiStatus,
  IUser,
  IUserForm,
  IUserState,
  updateUserData,
} from "./users.type";
import { createUser, getUsersList } from "./UserService";
import axios from "axios";
import { ApiConfig } from "../../../service/ApiConfig";
import { toastError, toastSuccess } from "../../../components/ToastifyConfig";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
};

export const getUsersListAction = createAsyncThunk(
  "users/getUsersListAction",
  getUsersList
);
export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  createUser
);

export const deleteUserAction = createAsyncThunk(
  "users/deleteUserAction",
  async (id: number) => {
    await axios.delete(ApiConfig.user + "/" + id);
    return id;
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({ id, data }: updateUserData) => {
    const response = await axios.put(`${ApiConfig.user}/${id}`, data);
    return response.data;
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetCreateUserStatus(state) {
      state.createUserFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsersListAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getUsersListAction.fulfilled, (state, action) => {
      state.list = action.payload;
      state.listStatus = ApiStatus.ideal;
    });
    builder.addCase(getUsersListAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });
    builder.addCase(createUserAction.pending, (state) => {
      state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(createUserAction.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.createUserFormStatus = ApiStatus.success;
      toastSuccess("User created");
    });
    builder.addCase(createUserAction.rejected, (state) => {
      state.createUserFormStatus = ApiStatus.error;
      toastError("Error while creating user");
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    });
    builder.addCase(updateUserAction.pending, (state) => {
      state.updateUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.updateUserFormStatus = ApiStatus.ideal;
      toastSuccess("User updated");
    });
    builder.addCase(updateUserAction.rejected, (state) => {
      state.updateUserFormStatus = ApiStatus.error;
      toastError("Error while updating user");
    });
  },
});
export const { resetCreateUserStatus } = usersSlice.actions;
export default usersSlice.reducer;
