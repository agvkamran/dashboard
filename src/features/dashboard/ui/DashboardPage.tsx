import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "@/features/dashboard/model/thunks";
import { RootState, AppDispatch } from "@/app/store";
import { Pagination } from "./Pagination";
import { UserModal } from "@/features/user/ui/UserModal";
import { setSelectedUser } from "@/features/user/model/slice";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.dashboard
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(fetchUsersThunk(1));
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return users;

    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        fullName.includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    });
  }, [users, debouncedSearchTerm]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Добро пожаловать, Камран!</h1>

      {isLoading && <p>Загрузка пользователей...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Поиск пользователей..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      <ul
        style={{ display: "grid", gap: "10px", listStyle: "none", padding: 0 }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => dispatch(setSelectedUser(user))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
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

      <UserModal />
      <Pagination />
    </div>
  );
};

export default DashboardPage;
