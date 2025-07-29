//@ts-ignore
import { RootState } from "@/app";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedUser } from "@/features/user/model/slice";

export const UserModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userInfo.selectedUser);

  if (!user) return null;

  const handleClose = () => {
    dispatch(clearSelectedUser());
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        <img
          src={user.avatar}
          alt={user.first_name}
          width={80}
          height={80}
          style={{ borderRadius: "50%", marginBottom: "10px" }}
        />
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p>{user.email}</p>

        <button onClick={handleClose} style={{ marginTop: "10px" }}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
