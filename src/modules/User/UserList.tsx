import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "../../redux/slices/users/users.type";
import {
  deleteUserAction,
  getUsersListAction,
  updateUserAction,
} from "../../redux/slices/users/UserSlice";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [dataModalView, setDataModalView] = React.useState<IUser | null>(null);
  const dispatch = useAppDispatch();
  const { list, listStatus } = useAppSelector(
    (state: RootState) => state.users
  );

  React.useEffect(() => {
    dispatch(getUsersListAction());
  }, []);

  const handleClickEditUser = (id: number) => {
    navigate(`/edit/${id}`);
  };
  return (
    <>
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
                  <td>
                    <div style={{ display: "flex", columnGap: "5px" }}>
                      <input
                        type="button"
                        value="View "
                        onClick={() => setDataModalView(user)}
                      />
                      <input
                        type="button"
                        value="Edit "
                        onClick={() => handleClickEditUser(user.id)}
                      />
                      <input
                        type="button"
                        value="Delete"
                        onClick={() => dispatch(deleteUserAction(user.id))}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      {dataModalView && (
        <Modal title="User Details" onClose={() => setDataModalView(null)}>
          <div>
            <div>
              <span>Name:{dataModalView.name}</span>
            </div>
            <div>
              <span>Email:{dataModalView.email}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserList;
