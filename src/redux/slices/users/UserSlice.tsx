import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUserState, User } from "./users.type";
import { toastError, toastSuccess } from "../../../components/ToastifyConfig";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
};

export const getUsersListAction = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
    })) as User[];
  }
);

// @ts-ignore
export const createUserAction = createAsyncThunk<IUser, IUser>(
  "users/addUserAsync",
  async (user) => {
    const docRef = await addDoc(collection(db, "users"), user);
    const newUser = { ...user, id: docRef.id };
    toastSuccess("User added successfully");
    return newUser;
  }
);

export const deleteUserAction = createAsyncThunk<string, string>(
  "users/deleteUserAsync",
  async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    toastSuccess("User deleted successfully");
    return userId;
  }
);
export const updateUserAction = createAsyncThunk(
  "users/editUserAsync",
  async (user: User) => {
    const { id, ...userData } = user;
    await updateDoc(doc(db, "users", id), userData);
    toastSuccess("User updated successfully");
    return { id, ...userData };
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
