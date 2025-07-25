import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/model/thunks";
//@ts-ignore
import type { RootState, AppDispatch } from "@/app";

interface IUser {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [formData, setFormData] = useState<IUser>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(user)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Входим..." : "Войти"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <p>Привет, {user.name}</p>}
    </form>
  );
};
