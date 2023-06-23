import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "../../redux/slices/users/users.type";
import { getUsersListAction } from "../../redux/slices/users/UserSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { list, listStatus } = useAppSelector(
    (state: RootState) => state.users
  );

  React.useEffect(() => {
    dispatch(getUsersListAction());
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      {listStatus === ApiStatus.loading && (
        <tbody>
          <tr>
            <td>List is loading</td>
          </tr>
        </tbody>
      )}
      {listStatus === ApiStatus.error && (
        <tbody>
          <tr>
            <td>Error while loading list users</td>
          </tr>
        </tbody>
      )}
      {listStatus === ApiStatus.ideal &&
        list.map((user: IUser) => {
          return (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Hovo</td>
              </tr>
            </tbody>
          );
        })}
    </table>
  );
};

export default UserList;
