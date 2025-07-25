import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/features/auth/model/slice";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      style={{
        padding: "10px 20px",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div>
        {user ? (
          <span>Привет, {user.name}</span>
        ) : (
          <span>Добро пожаловать</span>
        )}
      </div>
      {accessToken && <button onClick={handleLogout}>Выйти</button>}
    </header>
  );
};
