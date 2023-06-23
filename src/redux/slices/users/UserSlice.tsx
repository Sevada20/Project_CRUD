import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUserState } from "./users.type";
import { createUser, getUsersList } from "./UserService";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
};

export const getUsersListAction = createAsyncThunk(
  "users/getUsersListAction",
  getUsersList
);
export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  createUser
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
    });
    builder.addCase(createUserAction.rejected, (state) => {
      state.createUserFormStatus = ApiStatus.error;
    });
  },
});
export const { resetCreateUserStatus } = usersSlice.actions;
export default usersSlice.reducer;
