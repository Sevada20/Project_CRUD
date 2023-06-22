import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUserState } from "./users.type";

const initialState: IUserState = {
  list: [
    { id: 1, name: "David", email: "DavXach@mail.ru" },
    { id: 2, name: "Hovo", email: "HovPogh@mail.ru" },
  ],
  listStatus: ApiStatus.ideal,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
