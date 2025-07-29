import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "@/features/dashboard/model/thunks";
import { RootState, AppDispatch } from "@/app/store";
import { Pagination } from "./Pagination";
import { UserModal } from "@/features/user/ui/UserModal";
import { setSelectedUser } from "@/features/user/model/slice";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.dashboard
  );
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const searchTermFromUrl = params.get("search") || "";
  const userIdFromUrl = params.get("userId");

  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setParams({ search: value, page: "1" });
  };

  useEffect(() => {
    dispatch(fetchUsersThunk(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (userIdFromUrl && users.length > 0) {
      const foundUser = users.find((u) => u.id.toString() === userIdFromUrl);
      if (foundUser) {
        dispatch(setSelectedUser(foundUser));
      }
    }
  }, [userIdFromUrl, users, dispatch]);

  const handleCloseModal = () => {
    dispatch(setSelectedUser(null));
    const updatedParams = Object.fromEntries(params);
    delete updatedParams.userId;
    setParams(updatedParams);
  };

  const filteredUsers = useMemo(() => {
    const search = debouncedSearchTerm.toLowerCase().trim();
    if (!search) return users;

    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const reversedFullName = `${user.last_name} ${user.first_name}`.toLowerCase();
      const email = user.email.toLowerCase();

      return (
        fullName.includes(search) ||
        reversedFullName.includes(search) ||
        email.includes(search)
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
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      <ul
        style={{
          display: "grid",
          gap: "10px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => {
              dispatch(setSelectedUser(user));
              setParams({ ...Object.fromEntries(params), userId: user.id.toString() });
            }}
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

      <UserModal isOpen={!!selectedUser} onClose={handleCloseModal} />
      <Pagination />
    </div>
  );
};

export default DashboardPage;
