import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "../../redux/slices/users/users.type";

const UserList = () => {
  const { list, listStatus } = useAppSelector(
    (state: RootState) => state.users
  );

  return (
    <table>
      <tr>
        <th>Sr. No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
      {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
      {listStatus === ApiStatus.error && (
        <tbody>Error while loading list users</tbody>
      )}
      {listStatus === ApiStatus.ideal &&
        list.map((user: IUser) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>Hovo</td>
            </tr>
          );
        })}
    </table>
  );
};

export default UserList;
