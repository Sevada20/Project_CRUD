import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUserState } from "./users.type";
import { getUsersList } from "./UserService";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
};

export const getUsersListAction = createAsyncThunk(
  "users/getUsersListAction",
  getUsersList
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
  },
});

export default usersSlice.reducer;
