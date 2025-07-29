import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "@/features/dashboard/model/thunks";
import { RootState, AppDispatch } from "@/app/store";
import { Pagination } from "./Pagination";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error, totalPages, currentPage} = useSelector(
    (state: RootState) => state.dashboard
  );
  useEffect(() => {
    dispatch(fetchUsersThunk(1));
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Добро пожаловать, Камран!</h1>

      {isLoading && <p>Загрузка пользователей...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul
        style={{ display: "grid", gap: "10px", listStyle: "none", padding: 0 }}
      >
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              width={48}
              height={48}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <div>
                {user.first_name} {user.last_name}
              </div>
              <div style={{ fontSize: "12px", color: "#555" }}>
                {user.email}
              </div>
            </div>
          </li>
        ))}
      </ul>
    <Pagination />
    </div>
  );
};

export default DashboardPage;
